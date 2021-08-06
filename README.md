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

1. 세션 미들웨어가 req.session 을 만들어준다
2. edit-profile url에 id 파라미터를 추가해야할지 고민했다. 그렇게 하면 우리는 결국 req.session에서 user 안에 있는 id 로 db에서 유저를 불러찾고 수정한다.
   id 가 있건 말건 의미가 없다. 또한 id를 통해서 edit을 하면 그건 누구나 접근가능하기 때문에 그런 논리는 안된다.
3. findByIdAndUpdate 에서 옵션 new :true로 하면 업데이트된 데이터를 리턴한다. default 값은 false이다. upsert는 default가 false이다.업데이트 할 대상이 없다면 만들어낸다.
4. await User.exists({
   email: { $ne: email },
    username: { $ne: username },
  }); 
  $ne 를 통해 자신을 제외하고 검색하게 했다. 문제는 이제 자기자신을 제외하고 찾아서 업데이트가 잘되는데
   (자신을 제외하지 않아서 업데이트가 안됐음 그냥 기존값을 넣으면) 두개를 동시에 진행할 수 없다. $or을 줘야하는데 어떻게 줘야할지..
