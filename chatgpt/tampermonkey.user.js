// ==UserScript==
// @name         ChatGPT
// @namespace    https://github.com/public-knet/style
// @version      1.7
// @description  ChatGPT 스타일 변경
// @author       한승룡
// @icon         https://cdn.oaistatic.com/assets/favicon-l4nq08hd.svg
// @updateURL    https://raw.githubusercontent.com/public-knet/style/main/chatgpt/tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/public-knet/style/main/chatgpt/tampermonkey.user.js
// @match        *://chatgpt.com/*
// @grant        GM.xmlHttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
	'use strict';

	window.addEventListener('load', () => {
		inject('style', 'https://raw.githubusercontent.com/public-knet/style/main/chatgpt/custom.css');
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/_commons/commons.js');
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/chatgpt/custom.js');
	});
})();

function inject(type, url) {
	GM.xmlHttpRequest({
		method: 'GET',
		url: url,
		onload: res => {
			console.log(`Inject KNET ${type}: ${url}`)
			if (type === 'style') {
				const css = document.createElement('style');
				css.setAttribute('type', 'text/css');
				css.setAttribute('author', 'KNET');
				css.textContent = res.responseText;
				document.body.parentNode.insertBefore(css, document.body.nextSibling);
			} else if (type === 'script') {
				const script = document.createElement('script');
				script.textContent = res.responseText;
				document.body.parentNode.insertBefore(script, document.body.nextSibling);
			}
		}
	});
}