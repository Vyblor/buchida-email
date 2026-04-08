import { readdir, stat } from "node:fs/promises";
import { type IncomingMessage, type ServerResponse, createServer } from "node:http";
import { join, resolve } from "node:path";

export interface PreviewServerOptions {
	templatesDir: string;
	port?: number;
	host?: string;
}

export async function createPreviewServer(options: PreviewServerOptions) {
	const { templatesDir, port = 3001, host = "localhost" } = options;

	const resolvedDir = resolve(templatesDir);
	const templates = await discoverTemplates(resolvedDir);

	const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
		const url = new URL(req.url || "/", `http://${host}:${port}`);

		if (url.pathname === "/") {
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.end(renderIndexPage(templates));
			return;
		}

		if (url.pathname.startsWith("/preview/")) {
			const templateName = decodeURIComponent(url.pathname.slice("/preview/".length));
			const locale = url.searchParams.get("locale") || "en";
			const propsJson = url.searchParams.get("props") || "{}";

			try {
				const props = JSON.parse(propsJson);
				const html = await renderTemplate(resolvedDir, templateName, locale, props);
				res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
				res.end(html);
			} catch (err) {
				res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
				res.end(String(err));
			}
			return;
		}

		if (url.pathname === "/api/templates") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(templates));
			return;
		}

		if (url.pathname.startsWith("/api/compat/")) {
			const templateName = decodeURIComponent(url.pathname.slice("/api/compat/".length));
			const locale = url.searchParams.get("locale") || "en";
			const propsJson = url.searchParams.get("props") || "{}";
			try {
				const props = JSON.parse(propsJson);
				const html = await renderTemplate(resolvedDir, templateName, locale, props);
				const score = analyzeCompatibility(html);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(score));
			} catch (err) {
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: String(err) }));
			}
			return;
		}

		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not found");
	});

	server.listen(port, host, () => {
		console.log(`\u{1F4E7} buchida email preview: http://${host}:${port}`);
		console.log(`   ${templates.length} template${templates.length === 1 ? "" : "s"} found`);
	});

	return server;
}

async function discoverTemplates(dir: string): Promise<string[]> {
	try {
		const entries = await readdir(dir);
		const templates: string[] = [];
		for (const entry of entries) {
			const entryPath = join(dir, entry);
			const s = await stat(entryPath);
			if (s.isDirectory()) {
				templates.push(entry);
			}
		}
		return templates.sort();
	} catch {
		return [];
	}
}

async function renderTemplate(
	templatesDir: string,
	templateName: string,
	locale: string,
	props: Record<string, unknown>,
): Promise<string> {
	const templatePath = resolve(templatesDir, templateName);
	const distPath = join(templatePath, "dist", "index.js");

	// bust cache with timestamp
	const mod = await import(`${distPath}?t=${Date.now()}`);
	const { render } = await import("@buchida/render");
	const { createElement } = await import("react");

	const Component = mod.default;
	const html = render(createElement(Component, { locale, ...props } as Record<string, unknown>));
	return html;
}

interface CompatResult {
	score: number;
	label: "Good" | "Caution" | "Issues";
	color: string;
	checks: Array<{ name: string; status: "pass" | "warn" | "fail"; detail: string }>;
	sizeKb: number;
}

function analyzeCompatibility(html: string): CompatResult {
	const checks: CompatResult["checks"] = [];
	let score = 100;

	// Inline styles
	const inlineStyleCount = (html.match(/style="/g) || []).length;
	if (inlineStyleCount > 0) {
		checks.push({ name: "Inline styles", status: "pass", detail: `${inlineStyleCount} elements with inline styles` });
	} else {
		checks.push({ name: "Inline styles", status: "warn", detail: "No inline styles found — Outlook may strip CSS" });
		score -= 20;
	}

	// <style> blocks
	const styleBlocks = (html.match(/<style[\s>]/gi) || []).length;
	if (styleBlocks === 0) {
		checks.push({ name: "Style blocks", status: "pass", detail: "No <style> blocks (good for Outlook)" });
	} else {
		checks.push({ name: "Style blocks", status: "warn", detail: `${styleBlocks} <style> block(s) — stripped by some clients` });
		score -= 10;
	}

	// External CSS
	const externalCss = (html.match(/<link[^>]+rel=["']stylesheet/gi) || []).length;
	if (externalCss === 0) {
		checks.push({ name: "External CSS", status: "pass", detail: "No external stylesheets" });
	} else {
		checks.push({ name: "External CSS", status: "fail", detail: `${externalCss} external stylesheet(s) — not supported in email` });
		score -= 30;
	}

	// Images without alt
	const imgNoAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
	if (imgNoAlt === 0) {
		checks.push({ name: "Image alt text", status: "pass", detail: "All images have alt attributes" });
	} else {
		checks.push({ name: "Image alt text", status: "fail", detail: `${imgNoAlt} image(s) missing alt text` });
		score -= 15;
	}

	// Size
	const sizeKb = Math.round(new TextEncoder().encode(html).length / 1024);
	if (sizeKb <= 100) {
		checks.push({ name: "File size", status: "pass", detail: `${sizeKb} KB — within safe limit` });
	} else if (sizeKb <= 102) {
		checks.push({ name: "File size", status: "warn", detail: `${sizeKb} KB — near Gmail 102KB clipping limit` });
		score -= 10;
	} else {
		checks.push({ name: "File size", status: "fail", detail: `${sizeKb} KB — Gmail clips at 102KB` });
		score -= 25;
	}

	score = Math.max(0, score);
	const label: CompatResult["label"] = score >= 80 ? "Good" : score >= 60 ? "Caution" : "Issues";
	const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";

	return { score, label, color, checks, sizeKb };
}

function renderIndexPage(templates: string[]): string {
	const templateItems = templates
		.map(
			(t) =>
				`<li class="tmpl-item" data-name="${t}" onclick="selectTemplate('${t.replace(/'/g, "\\'")}')">
					<span class="tmpl-icon">\u{1F4E7}</span>
					<span class="tmpl-name">${t}</span>
				</li>`,
		)
		.join("\n");

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>buchida Email Preview</title>
	<style>
		*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

		:root {
			--bg: #f4f4f5;
			--surface: #ffffff;
			--border: #e4e4e7;
			--text: #18181b;
			--text-muted: #71717a;
			--accent: #2563eb;
			--accent-hover: #1d4ed8;
			--sidebar-bg: #18181b;
			--sidebar-text: #f4f4f5;
			--sidebar-muted: #a1a1aa;
			--sidebar-hover: #27272a;
			--sidebar-active: #3f3f46;
			--toolbar-bg: #09090b;
		}
		.dark {
			--bg: #09090b;
			--surface: #18181b;
			--border: #27272a;
			--text: #fafafa;
			--text-muted: #a1a1aa;
		}

		body {
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
			background: var(--bg);
			color: var(--text);
			height: 100vh;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		/* ---- Toolbar ---- */
		.toolbar {
			background: var(--toolbar-bg);
			color: #fafafa;
			display: flex;
			align-items: center;
			padding: 0 16px;
			height: 48px;
			gap: 12px;
			flex-shrink: 0;
			border-bottom: 1px solid #27272a;
			z-index: 10;
		}
		.toolbar-logo {
			font-weight: 700;
			font-size: 14px;
			letter-spacing: -0.02em;
			color: #fafafa;
		}
		.toolbar-logo span { color: #60a5fa; }
		.toolbar-sep { flex: 1; }
		.toolbar-btn {
			background: #27272a;
			border: 1px solid #3f3f46;
			color: #d4d4d8;
			padding: 5px 10px;
			border-radius: 6px;
			font-size: 12px;
			cursor: pointer;
			transition: background 0.15s;
		}
		.toolbar-btn:hover { background: #3f3f46; }
		.toolbar-btn.active { background: #2563eb; border-color: #3b82f6; color: #fff; }

		/* ---- Client sim bar ---- */
		.client-bar {
			background: #0f0f10;
			border-bottom: 1px solid #27272a;
			display: flex;
			align-items: center;
			padding: 0 16px;
			height: 40px;
			gap: 8px;
			flex-shrink: 0;
		}
		.client-bar-label {
			font-size: 11px;
			color: #71717a;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			margin-right: 4px;
		}
		.client-btn {
			background: transparent;
			border: 1px solid #3f3f46;
			color: #a1a1aa;
			padding: 3px 10px;
			border-radius: 4px;
			font-size: 12px;
			cursor: pointer;
			transition: all 0.15s;
		}
		.client-btn:hover { background: #27272a; color: #fafafa; }
		.client-btn.active { background: #2563eb; border-color: #3b82f6; color: #fff; }
		.compat-badge {
			margin-left: auto;
			font-size: 12px;
			font-weight: 600;
			padding: 3px 10px;
			border-radius: 4px;
			cursor: pointer;
			border: none;
		}

		/* ---- Main layout ---- */
		.main {
			display: flex;
			flex: 1;
			overflow: hidden;
		}

		/* ---- Left sidebar ---- */
		.sidebar {
			width: 220px;
			background: var(--sidebar-bg);
			border-right: 1px solid #27272a;
			display: flex;
			flex-direction: column;
			flex-shrink: 0;
			overflow: hidden;
		}
		.sidebar-header {
			padding: 12px 14px 8px;
			font-size: 10px;
			font-weight: 700;
			color: var(--sidebar-muted);
			text-transform: uppercase;
			letter-spacing: 0.08em;
		}
		.tmpl-list {
			list-style: none;
			overflow-y: auto;
			flex: 1;
			padding: 0 8px 8px;
		}
		.tmpl-item {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 7px 8px;
			border-radius: 6px;
			cursor: pointer;
			color: var(--sidebar-muted);
			font-size: 13px;
			transition: background 0.1s, color 0.1s;
		}
		.tmpl-item:hover { background: var(--sidebar-hover); color: var(--sidebar-text); }
		.tmpl-item.active { background: var(--sidebar-active); color: #fff; }
		.tmpl-icon { font-size: 13px; flex-shrink: 0; }
		.tmpl-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

		/* ---- Center preview ---- */
		.preview-panel {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			background: var(--bg);
		}
		.preview-container {
			flex: 1;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			overflow: auto;
			padding: 24px;
			background: var(--bg);
		}
		.preview-frame {
			background: #fff;
			box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08);
			border-radius: 4px;
			overflow: hidden;
			transition: width 0.2s ease, max-width 0.2s ease;
		}
		.preview-frame.dark-bg { background: #1a1a2e; }
		#preview-iframe {
			border: none;
			width: 100%;
			height: 600px;
			display: block;
		}
		.empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			color: var(--text-muted);
			gap: 12px;
		}
		.empty-state-icon { font-size: 48px; }
		.empty-state-title { font-size: 16px; font-weight: 600; }
		.empty-state-desc { font-size: 13px; }

		/* ---- Right sidebar ---- */
		.right-panel {
			width: 260px;
			background: var(--surface);
			border-left: 1px solid var(--border);
			display: flex;
			flex-direction: column;
			flex-shrink: 0;
			overflow: hidden;
		}
		.right-section {
			padding: 12px 14px;
			border-bottom: 1px solid var(--border);
		}
		.right-label {
			font-size: 11px;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			color: var(--text-muted);
			margin-bottom: 8px;
		}
		.locale-grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 6px;
		}
		.locale-btn {
			background: var(--bg);
			border: 1px solid var(--border);
			color: var(--text-muted);
			padding: 5px 0;
			border-radius: 5px;
			font-size: 12px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.15s;
			text-align: center;
		}
		.locale-btn:hover { border-color: var(--accent); color: var(--accent); }
		.locale-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
		.props-textarea {
			width: 100%;
			height: 140px;
			font-family: "JetBrains Mono", "Fira Code", monospace;
			font-size: 11px;
			padding: 8px;
			border: 1px solid var(--border);
			border-radius: 6px;
			background: var(--bg);
			color: var(--text);
			resize: vertical;
			line-height: 1.5;
		}
		.apply-btn {
			width: 100%;
			margin-top: 8px;
			background: var(--accent);
			border: none;
			color: #fff;
			padding: 8px 0;
			border-radius: 6px;
			font-size: 13px;
			font-weight: 600;
			cursor: pointer;
			transition: background 0.15s;
		}
		.apply-btn:hover { background: var(--accent-hover); }

		.compat-panel { flex: 1; overflow-y: auto; padding: 12px 14px; }
		.compat-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 10px; }
		.compat-check {
			display: flex;
			gap: 8px;
			font-size: 12px;
			margin-bottom: 8px;
			align-items: flex-start;
		}
		.compat-check-icon { flex-shrink: 0; font-size: 13px; margin-top: 1px; }
		.compat-check-name { font-weight: 600; color: var(--text); }
		.compat-check-detail { color: var(--text-muted); font-size: 11px; }
		.compat-placeholder { color: var(--text-muted); font-size: 13px; text-align: center; margin-top: 24px; }

		/* ---- Scrollbars ---- */
		::-webkit-scrollbar { width: 6px; height: 6px; }
		::-webkit-scrollbar-track { background: transparent; }
		::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 3px; }
	</style>
</head>
<body>
	<!-- Toolbar -->
	<div class="toolbar">
		<div class="toolbar-logo">buchida <span>preview</span></div>
		<div class="toolbar-sep"></div>
		<button class="toolbar-btn" id="dark-mode-btn" onclick="toggleDarkPreview()">Dark BG</button>
		<button class="toolbar-btn" id="theme-btn" onclick="toggleTheme()">Light UI</button>
	</div>

	<!-- Client simulation bar -->
	<div class="client-bar">
		<span class="client-bar-label">Client</span>
		<button class="client-btn active" data-client="gmail" onclick="setClient(this, 600, false)">Gmail</button>
		<button class="client-btn" data-client="outlook" onclick="setClient(this, 600, true)">Outlook</button>
		<button class="client-btn" data-client="naver" onclick="setClient(this, 550, false)">Naver</button>
		<button class="client-btn" data-client="apple" onclick="setClient(this, 800, false)">Apple Mail</button>
		<button class="client-btn" data-client="mobile" onclick="setClient(this, 375, false)">Mobile</button>
		<button class="compat-badge" id="compat-badge" onclick="showCompat()" style="background:#3f3f46;color:#a1a1aa;display:none">-- Compat</button>
	</div>

	<!-- Main layout -->
	<div class="main">
		<!-- Left sidebar -->
		<div class="sidebar">
			<div class="sidebar-header">Templates (${templates.length})</div>
			<ul class="tmpl-list" id="tmpl-list">
				${templateItems || '<li style="padding:12px;color:#52525b;font-size:13px">No templates found</li>'}
			</ul>
		</div>

		<!-- Center preview -->
		<div class="preview-panel">
			<div class="preview-container" id="preview-container">
				<div class="empty-state" id="empty-state">
					<div class="empty-state-icon">\u{1F4E7}</div>
					<div class="empty-state-title">Select a template</div>
					<div class="empty-state-desc">Choose a template from the left sidebar</div>
				</div>
				<div id="preview-wrap" style="display:none;width:100%;display:flex;justify-content:center">
					<div class="preview-frame" id="preview-frame" style="width:600px">
						<iframe id="preview-iframe" title="Email preview" sandbox="allow-same-origin allow-scripts"></iframe>
					</div>
				</div>
			</div>
		</div>

		<!-- Right panel -->
		<div class="right-panel">
			<div class="right-section">
				<div class="right-label">Locale</div>
				<div class="locale-grid">
					<button class="locale-btn active" onclick="setLocale('en', this)">EN</button>
					<button class="locale-btn" onclick="setLocale('ko', this)">KO</button>
					<button class="locale-btn" onclick="setLocale('ja', this)">JA</button>
					<button class="locale-btn" onclick="setLocale('zh', this)">ZH</button>
				</div>
			</div>
			<div class="right-section">
				<div class="right-label">Props (JSON)</div>
				<textarea class="props-textarea" id="props-editor" placeholder="{}">{}</textarea>
				<button class="apply-btn" onclick="applyProps()">Apply Props</button>
			</div>
			<div class="compat-panel">
				<div class="compat-title">Compatibility</div>
				<div id="compat-results">
					<div class="compat-placeholder">Select a template to see compatibility analysis</div>
				</div>
			</div>
		</div>
	</div>

	<script>
		var state = {
			template: null,
			locale: 'en',
			props: {},
			client: 'gmail',
			clientWidth: 600,
			darkPreview: false,
			darkUI: false
		};

		function selectTemplate(name) {
			state.template = name;
			document.querySelectorAll('.tmpl-item').forEach(function(el) {
				el.classList.toggle('active', el.dataset.name === name);
			});
			document.getElementById('empty-state').style.display = 'none';
			document.getElementById('preview-wrap').style.display = 'flex';
			refreshPreview();
		}

		function refreshPreview() {
			if (!state.template) return;
			var propsStr = JSON.stringify(state.props);
			var src = '/preview/' + encodeURIComponent(state.template)
				+ '?locale=' + state.locale
				+ '&props=' + encodeURIComponent(propsStr);
			var iframe = document.getElementById('preview-iframe');
			iframe.src = src;
			iframe.onload = function() { autoHeight(); };
			updateCompat();
		}

		function autoHeight() {
			var iframe = document.getElementById('preview-iframe');
			try {
				var h = iframe.contentWindow.document.body.scrollHeight;
				if (h > 0) iframe.style.height = (h + 40) + 'px';
			} catch(e) {}
		}

		function setClient(btn, width, _mso) {
			document.querySelectorAll('.client-btn').forEach(function(b) { b.classList.remove('active'); });
			btn.classList.add('active');
			state.clientWidth = width;
			var frame = document.getElementById('preview-frame');
			frame.style.width = width + 'px';
			frame.style.maxWidth = width + 'px';
		}

		function setLocale(loc, btn) {
			state.locale = loc;
			document.querySelectorAll('.locale-btn').forEach(function(b) { b.classList.remove('active'); });
			btn.classList.add('active');
			refreshPreview();
		}

		function applyProps() {
			var raw = document.getElementById('props-editor').value.trim() || '{}';
			try {
				state.props = JSON.parse(raw);
				refreshPreview();
			} catch(e) {
				alert('Invalid JSON: ' + e.message);
			}
		}

		function toggleDarkPreview() {
			state.darkPreview = !state.darkPreview;
			var frame = document.getElementById('preview-frame');
			frame.classList.toggle('dark-bg', state.darkPreview);
			document.getElementById('dark-mode-btn').classList.toggle('active', state.darkPreview);
		}

		function toggleTheme() {
			state.darkUI = !state.darkUI;
			document.body.classList.toggle('dark', state.darkUI);
			document.getElementById('theme-btn').textContent = state.darkUI ? 'Dark UI' : 'Light UI';
			document.getElementById('theme-btn').classList.toggle('active', state.darkUI);
		}

		function updateCompat() {
			if (!state.template) return;
			var propsStr = JSON.stringify(state.props);
			var url = '/api/compat/' + encodeURIComponent(state.template)
				+ '?locale=' + state.locale
				+ '&props=' + encodeURIComponent(propsStr);
			fetch(url)
				.then(function(r) { return r.json(); })
				.then(function(data) { renderCompat(data); })
				.catch(function() {});
		}

		function renderCompat(data) {
			var badge = document.getElementById('compat-badge');
			var icons = { pass: '\u2705', warn: '\u26A0\uFE0F', fail: '\u274C' };
			badge.style.display = 'block';
			badge.style.background = data.color + '22';
			badge.style.color = data.color;
			badge.style.border = '1px solid ' + data.color + '55';
			badge.textContent = data.label + ' (' + data.score + ')';

			var html = '';
			for (var i = 0; i < data.checks.length; i++) {
				var c = data.checks[i];
				html += '<div class="compat-check">'
					+ '<span class="compat-check-icon">' + icons[c.status] + '</span>'
					+ '<div><div class="compat-check-name">' + esc(c.name) + '</div>'
					+ '<div class="compat-check-detail">' + esc(c.detail) + '</div></div>'
					+ '</div>';
			}
			html += '<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:12px;color:var(--text-muted)">'
				+ 'Size: <strong style="color:var(--text)">' + data.sizeKb + ' KB</strong>'
				+ ' &nbsp; Score: <strong style="color:' + data.color + '">' + data.score + '/100</strong>'
				+ '</div>';
			document.getElementById('compat-results').innerHTML = html;
		}

		function showCompat() {
			document.getElementById('compat-results').scrollIntoView({ behavior: 'smooth' });
		}

		function esc(s) {
			return String(s)
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;');
		}

		// Props editor: Ctrl+Enter to apply
		document.getElementById('props-editor').addEventListener('keydown', function(e) {
			if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') applyProps();
		});
	</script>
</body>
</html>`;
}
