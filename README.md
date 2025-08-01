# CORS

Github 의 raw URL 은 CORS 설정이 없어서 CloudFlare 를 통해 호스팅 하도록 설정함. 

* CloudFlare 계정: `knetdev@knetbiz.com`

## URL

`https://public-knet-style.knetdev.workers.dev/[url]` 형식으로 연결됨.

예)
- `/jenkins/custom.css` → `https://public-knet-style.knetdev.workers.dev/jenkins/custom.css`
- `/jenkins/custom.js` → `https://public-knet-style.knetdev.workers.dev/jenkins/custom.js`

원래 github 주소는
- `/jenkins/custom.css` → `https://raw.githubusercontent.com/public-knet/style/main/jenkins/custom.css`
- `/jenkins/custom.js` → `https://raw.githubusercontent.com/public-knet/style/main/jenkins/custom.js`


## 요금

Free 요금제로 Workers 사용 시

- 요청당 최대 10ms CPU 시간
- 일일 최대 100,000개(UTC + 0)

