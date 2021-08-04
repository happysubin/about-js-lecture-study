노마드코더 유튜브 챌린지 졸업과제입니다. 배운 것을 복습하고 또 더 깊게 생각해 에러처리 등 제가 생각한 것을 추가하겠습니다.

1일차

1. app.set("view engine", "pug"); 이걸로 인해서 확장자 .pug를 안써도 render가 가능했었다.
   ex res.render("home")이 렌더링. 위에 코드를 지우고 res.render("home.pug")하면 정상적으로 렌더링된다.
2. 자주 연습해서 그런지 여기까지는 큰 오류없이 쉽게 진행

2일차

1. req.params.id 는 string 이고 videos 객체안에 id 타입은 object라서 ===연산자가 먹히지 않아 조금 헤맸다
2. videos[id - 1].hashtags = hashtags 이 방법으로 업데이트를 할 생각을 하느라 오래걸렸다.
3. startsWith로 편하게 #을 체크함

3일차
