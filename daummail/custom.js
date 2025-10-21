document.KNET.pretty = ($li) => {
	if ($li.data('pretty')) {
		return;
	}

	const $link = $li.find('a.link_mail');
	const $linkText = $link.find('.on_link');

	// title 변경
	let title = $linkText.text().trim();
	if (!title.startsWith('--')) {
		$li.data('pretty', true)
		return;
	}

	$link.addClass('seperator');

	const maxSize = 30
	title = title.replace(/-/g, '');
	const titleLength = document.KNET.util.getByteLength(title);
	const padStartLength = Math.floor((maxSize - titleLength) / 2);
	const padEndLength = maxSize - titleLength - padStartLength;
	title = ''.padStart(padStartLength, '-') + title;
	title = title + ''.padEnd(padEndLength, '-');
	$linkText.html(title.replace(/ /g, '&nbsp;'))

	console.log($li.index(), title);
	$li.data('pretty', true)
}

document.KNET.doPretty = async () => {
	const $menuGroup1 = await document.KNET.util.waitForElement('#menuGroup1');

	$menuGroup1.find('> li').each(function () {
		document.KNET.pretty($(this));
	});
}

// ----------------------------------------------------------------

(async () => {
	await document.KNET.util.loadJQuery();
	await document.KNET.util.waitForDocumentReady();

	// 최초 1회 실행
	console.log('> Pretty : init')
	await document.KNET.doPretty();
})();
