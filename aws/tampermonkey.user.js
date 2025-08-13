// ==UserScript==
// @name         AWS Console
// @namespace    https://github.com/public-knet/style
// @version      1.4
// @description  AWS Console 스타일 변경
// @author       한승룡
// @icon         https://a.b.cdn.console.awsstatic.com/a/v1/YMDV5OFQK7UFN5N2QPZNRZZN2QIHTD4OSMMQG6VKETYTJ357ZJ2Q/icon/de7db04805a33606a40b897578543648-c0174badf433f1e0148e43426ae8e43a.svg
// @updateURL    https://raw.githubusercontent.com/public-knet/style/main/aws/tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/public-knet/style/main/aws/tampermonkey.user.js
// @match        *://*.console.aws.amazon.com/*
// @grant        GM.xmlHttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
	'use strict';

	window.addEventListener('load', () => {
		inject('style', 'https://raw.githubusercontent.com/public-knet/style/main/aws/custom.css');
		inject('script', 'https://raw.githubusercontent.com/public-knet/style/main/aws/custom.js');
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
				css.setAttribute("type", "text/css");
				css.setAttribute("author", "KNET");
				css.textContent = res.responseText;
				document.body.parentNode.insertBefore(css, document.body.nextSibling);
			} else if (type === 'script') {
				var script = document.createElement("script");
				script.textContent = res.responseText;
				document.body.parentNode.insertBefore(script, document.body.nextSibling);
			}
		}
	});
}