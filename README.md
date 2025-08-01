# CORS

Github 의 raw URL 은 CORS 설정이 없어서 CDN 을 통해야 하며, 아래 규칙으로 접속 가능

```
https://cdn.jsdelivr.net/gh/[repo-url]@[branch]/[path]
```

예) https://github.com/public-knet/style repo 의 main 브랜치의 `/jenkins/custom.css` 파일 → https://cdn.jsdelivr.net/gh/public-knet/style@main/jenkins/custom.css
