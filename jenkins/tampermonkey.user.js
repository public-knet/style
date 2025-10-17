// ==UserScript==
// @name         Jenkins
// @namespace    https://github.com/public-knet/style
// @version      1.20
// @description  Jenkins 스타일 변경
// @author       한승룡
// @icon         https://jenkins.devops.knetbiz.com/static/d9ac7ab9/favicon.ico
// @updateURL    https://raw.githubusercontent.com/public-knet/style/main/jenkins/tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/public-knet/style/main/jenkins/tampermonkey.user.js
// @match        *://jenkins.knetbiz.com/*
// @match        *://jenkins.devops.knetbiz.com/*
// @match        *://jenkins.dev.knetbiz.com/*
// @match        *://jenkins.prod.knetbiz.com/*
// @grant        GM.xmlHttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
	'use strict';

	window.addEventListener('load', () => {
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/_commons/commons.js');
		inject('style', 'https://raw.githubusercontent.com/public-knet/style/main/jenkins/custom.css');
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/jenkins/custom.js');
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
				css.setAttribute('author', 'KNET');
				css.setAttribute('type', 'text/css');
				css.textContent = res.responseText;
				document.body.parentNode.insertBefore(css, document.body.nextSibling);
			} else if (type === 'script') {
				const script = document.createElement('script');
				script.setAttribute("author", "KNET");
				script.textContent = res.responseText;
				document.body.parentNode.insertBefore(script, document.body.nextSibling);
			}
		}
	});
}