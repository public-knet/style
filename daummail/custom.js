KNET.pretty = ($li) => {
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
	const titleLength = KNET.util.getByteLength(title);
	const padStartLength = Math.floor((maxSize - titleLength) / 2);
	const padEndLength = maxSize - titleLength - padStartLength;
	title = ''.padStart(padStartLength, '-') + title;
	title = title + ''.padEnd(padEndLength, '-');
	$linkText.html(title.replace(/ /g, '&nbsp;'))

	console.log($li.index(), title);
	$li.data('pretty', true)
}

KNET.doPretty = async () => {
	const $menuGroup1 = await KNET.util.waitForElement('#menuGroup1');

	$menuGroup1.find('> li').each(function () {
		KNET.pretty($(this));
	});
}

// ----------------------------------------------------------------

(async () => {
	await KNET.util.loadJQuery();
	await KNET.util.waitForDocumentReady();

	// 최초 1회 실행
	console.log('> Pretty : init')
	await KNET.doPretty();
})();
