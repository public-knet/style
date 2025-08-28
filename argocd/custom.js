function loadJQuery() {
	return new Promise((resolve, reject) => {
		if (typeof window.jQuery !== 'undefined') {
			console.log('jQuery already loaded!');
			resolve();
			return;
		}

		const script   = document.createElement('script');
		script.src     = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js';
		script.onload  = () => {
			console.log('jQuery loaded!');
			resolve();
		};
		script.onerror = () => {
			console.log('jQuery failed to load.');
			reject('jQuery failed to load.');
		};
		document.head.appendChild(script);
	});
}

function waitForDocumentReady() {
	return new Promise((resolve, reject) => {
		$(document).ready(() => {
			resolve();
		})
	});
}

function waitForElement(selector, timeout = 10000) {
	return new Promise((resolve, reject) => {
		const $el = $(selector);
		if ($el.length > 0) return resolve($el); // 이미 존재하면 바로 반환

		const observer = new MutationObserver(() => {
			const $el = $(selector);
			if ($el.length > 0) {
				observer.disconnect(); // 감시 중단
				resolve($el);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree  : true,
		});

		// 타임아웃 설정 (선택 사항)
		if (timeout) {
			setTimeout(() => {
				observer.disconnect();
				reject(new Error(`Timeout: Element "${selector}" not found within ${timeout}ms`));
			}, timeout);
		}
	});
}

(async () => {

	// -------------------------------------------------------------------------------------------------------------------------
	// Jquery & Document
	// -------------------------------------------------------------------------------------------------------------------------
	await loadJQuery();

	await waitForDocumentReady();

	// -------------------------------------------------------------------------------------------------------------------------
	// Application Title Replacement
	// -------------------------------------------------------------------------------------------------------------------------

	const prettyApplicationTitle = ($title) => {
		let title = $title.text().trim();

		console.log($title.index() - 1, title);

		const profile = title.substring(title.lastIndexOf('-')).replace('-', '');
		const name    = title.substring(0, title.lastIndexOf('-'));

		$title.html(`
			<span class="profile profile-${profile}">${profile === 'devops' ? 'dev<br/>ops' : profile}</span>
			<span class="title">${name}</span>
		`);
	}

	// -------------------------------------------------------------------------------------------------------------------------
	// Event
	// -------------------------------------------------------------------------------------------------------------------------

	const $applicationTiles = await waitForElement('.applications-tiles');

	const doPretty = () => {
		const $titleArray = $applicationTiles.find('.applications-list__title');

		$titleArray.each(function () {
			prettyApplicationTitle($(this));
		});
	}

	console.log('> Pretty Application Title : init')
	doPretty()

	new MutationObserver(() => {
		const processed = $applicationTiles.find('.profile').length > 0
		if (!processed) {
			console.log('> Pretty Application Title : changed')
			doPretty();
		}
	}).observe($applicationTiles[0], {
		childList            : true, // 감지: <th> 추가/삭제
		subtree              : true, // 하위 노드(<th> 내부 텍스트 포함)까지 감시
		characterData        : true, // 텍스트 변경 감지
		characterDataOldValue: true,
	});

	// -------------------------------------------------------------------------------------------------------------------------

})();