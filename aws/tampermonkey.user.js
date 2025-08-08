// ==UserScript==
// @name         AWS Console
// @namespace    https://www.knetbiz.com
// @version      1.0
// @description  AWS Console 스타일 변경
// @author       nofaterock
// @updateURL    https://raw.githubusercontent.com/public-knet/style/main/aws/tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/public-knet/style/main/aws/tampermonkey.user.js
// @match        *://*.console.aws.amazon.com/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @grant        GM.xmlHttpRequest
// @connect      public-knet-style.knetdev.workers.dev
// ==/UserScript==

(function() {
	'use strict';

	document.addEventListener("DOMContentLoaded", function () {
		inject('style', 'https://public-knet-style.knetdev.workers.dev/aws/custom.css');
		inject('script', 'https://public-knet-style.knetdev.workers.dev/aws/custom.js');
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