KNET.pretty = ($entry) => {
	if ($entry.data('pretty')) {
		return;
	}

	// title 변경
	const $title = $entry.find('.applications-list__title');
	let title = $title.text().trim();

	console.log($entry.index() - 1, title);

	const profile = title.substring(title.lastIndexOf('-')).replace('-', '');
	const name = title.substring(0, title.lastIndexOf('-'));

	$title.html(`
			<span class="profile profile-${profile}">${profile === 'devops' ? 'dev<br/>ops' : profile}</span>
			<span class="title">${name}</span>
		`);

	// Labels 변경
	const $labelsValue = $entry.find('.row:nth-child(3)').find('div:nth-child(2) span');
	$labelsValue.html($labelsValue.text().replace('name=', ''))

	// Last Sync 변경
	const $lastSyncValue = $entry.find('.row:nth-child(11)').find('div:nth-child(2) span');
	let lastSync = $lastSyncValue.text();
	lastSync = lastSync.split('(')[1]
	lastSync = lastSync.substring(0, lastSync.length - 1)
	$lastSyncValue.html(lastSync)

	$entry.data('pretty', true)
}

KNET.doPretty = async () => {
	const $applicationTiles = await KNET.util.waitForElement('.applications-tiles');

	$applicationTiles.find('.applications-list__entry').each(function () {
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

	// event: url 변경 감지
	KNET.util.urlChange(async () => {
		if (location.pathname !== '/applications')
			return;

		console.log('> Pretty : URL changed.')
		await KNET.doPretty();
	});
})();