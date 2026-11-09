KNET.highlightJson = (text) => {
	const escaped = text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	return escaped.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
		(match) => {
			let cls = 'knet-json-number';
			if (/^"/.test(match)) {
				cls = /:$/.test(match) ? 'knet-json-key' : 'knet-json-string';
			} else if (/true|false/.test(match)) {
				cls = 'knet-json-boolean';
			} else if (/null/.test(match)) {
				cls = 'knet-json-null';
			}
			return `<span class="${cls}">${match}</span>`;
		}
	);
};

KNET.looksLikeJson = (text) => {
	if (!text) return false;
	const t = text.trim();
	return (t.startsWith('{') && t.endsWith('}')) || (t.startsWith('[') && t.endsWith(']'));
};

KNET.scanJsonLeaves = (root) => {
	root.querySelectorAll('*').forEach((el) => {
		if (el.children.length > 0) return; // 이미 처리됐거나 텍스트 리프가 아님

		const text = el.textContent;
		if (!KNET.looksLikeJson(text)) return;

		el.innerHTML = KNET.highlightJson(text);
	});
};

KNET.watchJsonContainer = ($container) => {
	const el = $container[0];
	if (!el || el.dataset.knetJsonHlWatching) return;
	el.dataset.knetJsonHlWatching = '1';

	KNET.scanJsonLeaves(el);

	let scheduled = false;
	const observer = new MutationObserver(() => {
		if (scheduled) return;
		scheduled = true;
		requestAnimationFrame(() => {
			scheduled = false;
			KNET.scanJsonLeaves(el);
		});
	});
	observer.observe(el, {childList: true, subtree: true});
};

KNET.initJsonHighlight = () => {
	const selectors = [
		'.logs-list-view-container',
		'.log-context-container',
		'.data-viewer',
	];

	selectors.forEach((selector) => {
		KNET.util.waitForElement(selector, 15000)
			.then(($el) => KNET.watchJsonContainer($el))
			.catch(() => {});
	});
};

// ----------------------------------------------------------------

(async () => {
	await KNET.util.loadJQuery();
	await KNET.util.waitForDocumentReady();

	console.log('> SigNoz JSON Highlight : init')
	KNET.initJsonHighlight();

	KNET.util.urlChange(() => {
		console.log('> SigNoz JSON Highlight : URL changed.')
		KNET.initJsonHighlight();
	});
})();
