KNET.pretty = ($li) => {
	if ($li.data('pretty')) {
		return;
	}

	const $link = $li.find('a.link_mail');
	const $linkText = $link.find('on_link');

	// title 변경
	let title = $linkText.text().trim();
	if (!title.startsWith('--')) {
		$li.data('pretty', true)
		return;
	}

	console.log($li.index() - 1, title);

	title = title.split(' ')[1] + ' ';
	$linkText.addClass('seperator').html(title.padEnd(30, '-'))

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