// ==UserScript==
// @name         ArgoCD
// @namespace    https://github.com/public-knet/style
// @version      1.24
// @description  ArgoCD 스타일 변경
// @author       한승룡
// @icon         https://argocd.devops.knetbiz.com/assets/favicon/favicon-32x32.png
// @updateURL    https://raw.githubusercontent.com/public-knet/style/main/argocd/tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/public-knet/style/main/argocd/tampermonkey.user.js
// @match        *://argocd.devops.knetbiz.com/*
// @grant        GM.xmlHttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
	'use strict';

	window.addEventListener('load', () => {
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/_commons/commons.js');
		inject('style', 'https://raw.githubusercontent.com/public-knet/style/main/argocd/custom.css');
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/argocd/custom.js');
	});
})();

function inject(type, url) {
	GM.xmlHttpRequest({
		method: "GET",
		url: url,
		onload: res => {
			console.log(`Inject KNET ${type}: ${url}`)
			if (type === 'style') {
				const css = document.createElement('style');
				css.setAttribute("author", "KNET");
				css.setAttribute("type", "text/css");
				css.textContent = res.responseText;
				document.body.parentNode.insertBefore(css, document.body.nextSibling);
			} else if (type === 'script') {
				const script = document.createElement("script");
				script.setAttribute("author", "KNET");
				script.textContent = res.responseText;
				document.body.parentNode.insertBefore(script, document.body.nextSibling);
			}
		}
	});
}