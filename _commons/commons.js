const KNET = {
	util: {
		loadJQuery() {
			return new Promise((resolve, reject) => {
				if (typeof window.jQuery !== 'undefined') {
					console.log('jQuery already loaded!');
					resolve();
					return;
				}

				const script = document.createElement('script');
				script.src = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js';
				script.onload = () => {
					console.log('jQuery loaded!');
					resolve();
				};
				script.onerror = () => {
					console.log('jQuery failed to load.');
					reject('jQuery failed to load.');
				};
				document.head.appendChild(script);
			});
		},
		waitForDocumentReady() {
			return new Promise((resolve, reject) => {
				$(document).ready(() => {
					resolve();
				})
			});
		},
		waitForElement(selector, timeout = 10000) {
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
					subtree: true,
				});

				// 타임아웃 설정 (선택 사항)
				if (timeout) {
					setTimeout(() => {
						observer.disconnect();
						reject(new Error(`Timeout: Element "${selector}" not found within ${timeout}ms`));
					}, timeout);
				}
			});
		},
		urlChange(func) {
			(function (history) {
				const pushState = history.pushState;
				const replaceState = history.replaceState;

				function fireUrlChange() {
					window.dispatchEvent(new Event('urlchange'));
				}

				history.pushState = function (...args) {
					const result = pushState.apply(this, args);
					fireUrlChange();
					return result;
				};

				history.replaceState = function (...args) {
					const result = replaceState.apply(this, args);
					fireUrlChange();
					return result;
				};

				window.addEventListener('popstate', fireUrlChange);
			})(window.history);

			window.addEventListener('urlchange', func);
		}
	},
}
