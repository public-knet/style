const langs = [
	'html',
	'java',
	'kotlin',
	'node',
	'nodejs',
	'go',
	'golang',
	'python',
	'php',
	'asp',
	'dotnet',
	'csharp',
	'gradle',
	'helm',
]

const replaceFunction = (thElement) => {
	if (thElement.dataset.processed) {
		return;
	}

	let title = thElement.textContent.trim();

	const parts = title.trim().split(/\s+/);
	if (parts.length === 0) return '';

	// 1. 첫 단어: 언어 이름만 추출 (기호 제거)
	const lang = parts[0].replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').toLowerCase(); // []: 등 제거

	// 2. 마지막 단어: 인덱스 숫자 추출
	let index   = null;
	const last  = parts[parts.length - 1];
	const match = last.match(/^[\[({](\d+)[\])}]$/);
	if (match) {
		index = match[1];
	}

	// 3. lang element 생성
	let langElement = null;
	if (langs.includes(lang)) {
		parts.shift(); // 첫번째 인덱스 제거
		langElement           = document.createElement('span');
		langElement.className = 'stage-lang stage-lang-' + lang;
		langElement.innerHTML = lang;
	}

	// 4. index element 생성
	let indexElement = null;
	if (index !== null) {
		parts.pop(); // 마지막 인덱스 제거
		indexElement           = document.createElement('span');
		indexElement.className = 'stage-index';
		indexElement.innerHTML = index;
	}

	// 5. lang element 나 index element 가 없으면 종료
	if (!langElement && !indexElement) {
		thElement.dataset.processed = 'true'; // 중복 실행 방지를 위한 처리 완료 표시
		return;
	}

	// 6. title 적용
	thElement.textContent = parts.join(' ');

	// 7. element 삽입
	if (langElement)
		thElement.prepend(langElement);

	if (indexElement)
		thElement.append(indexElement);

	// 8. th 세로 정렬 변경
	thElement.style.verticalAlign = 'top';

	// 9. 중복 실행 방지를 위한 처리 완료 표시
	thElement.dataset.processed = 'true';
}

document.addEventListener('DOMContentLoaded', () => {
	/**
	 * 지정된 셀렉터의 요소가 DOM에 나타날 때까지 기다린 후 콜백을 실행합니다.
	 * @param {string} selector - 기다릴 요소의 CSS 셀렉터입니다.
	 * @param {function} callback - 요소가 발견되었을 때 실행할 콜백 함수입니다.
	 */
	function waitForElement(selector, callback) {
		// 1. 스크립트 실행 시점에 이미 요소가 있는지 즉시 확인합니다.
		const element = document.querySelector(selector);
		if (element) {
			callback(element);
			return;
		}

		// 2. 요소가 없다면, 상위 DOM의 변경을 감시할 Observer를 설정합니다.
		const observer = new MutationObserver((mutations, me) => {
			// DOM에 변경이 일어날 때마다 다시 요소를 찾아봅니다.
			const targetElement = document.querySelector(selector);
			if (targetElement) {
				// 3. 요소를 찾았다면!
				me.disconnect(); // 더 이상 상위 DOM을 감시할 필요가 없으므로 Observer를 중단합니다. (매우 중요!)
				callback(targetElement); // 원래 실행하려던 콜백 함수를 실행합니다.
			}
		});

		// 감시를 시작합니다. body 전체의 자식요소 및 하위 모든 요소의 변경을 감지합니다.
		observer.observe(document.body, {
			childList: true,
			subtree  : true
		});

		console.log(`'${selector}' 요소를 기다리는 중입니다...`);
	}

	// --- 실제 실행 로직 ---

	// waitForElement 함수를 사용하여 '.jobsTable thead tr' 요소가 나타나면
	// 그 안에 'th'를 감시하는 로직을 실행하도록 설정합니다.
	waitForElement('.cbwf-stage-view #pipeline-box .jobsTable thead tr', (theadTrElement) => {
		console.log(`성공! 요소를 찾았습니다. 이제 th 추가를 감시합니다.`);

		// 이곳의 코드는 theadTrElement가 확실히 존재할 때 실행됩니다.

		// 이미 존재하는 th 처리
		theadTrElement.querySelectorAll('th').forEach(existingTh => {
			replaceFunction(existingTh);
		});

		// th 추가를 감시하는 두 번째(원래의 목표) MutationObserver를 설정합니다.
		const thObserver = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					mutation.addedNodes.forEach(node => {
						if (node.nodeType === 1 && node.tagName === 'TH') {
							replaceFunction(node);
						}
					});
				}
			}
		});

		// thead 안의 tr 요소에 대한 감시를 시작합니다.
		thObserver.observe(theadTrElement, {childList: true});
	});
});