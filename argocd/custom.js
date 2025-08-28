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

	const prettyApplicationTitle = ($info) => {
		// title 변경
		const $title = $info.find('.applications-list__title');
		let title    = $title.text().trim();

		const profile = title.substring(title.lastIndexOf('-')).replace('-', '');
		const name    = title.substring(0, title.lastIndexOf('-'));

		$title.html(`
			<span class="profile profile-${profile}">${profile === 'devops' ? 'dev<br/>ops' : profile}</span>
			<span class="title">${name}</span>
		`);

		// Labels 변경
		const $labelsValue = $info.find('.row:nth-child(3)').find('div:nth-child(2) span');
		$labelsValue.html($labelsValue.text().replace('name=', ''))

		// Last Sync 변경
		const $lastSyncValue = $info.find('.row:nth-child(11)').find('div:nth-child(2) span');
		let lastSync         = $lastSyncValue.text();
		lastSync             = lastSync.split('(')[1]
		lastSync             = lastSync.substring(0, lastSync.length - 1)
		$lastSyncValue.html(lastSync)
	}

	// -------------------------------------------------------------------------------------------------------------------------
	// Event
	// -------------------------------------------------------------------------------------------------------------------------

	const $applicationTiles = await waitForElement('.applications-tiles');

	const doPretty = () => {
		const $infoArray = $applicationTiles.find('.applications-list__info');

		$infoArray.each(function () {
			prettyApplicationTitle($(this));
		});
	}

	console.log('> Pretty Application Title : init')
	doPretty()

	// -------------------------------------------------------------------------------------------------------------------------

})();