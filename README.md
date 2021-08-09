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
4. 방금 내용을 취소한다. 어차피 email과 username은 unique라 겹칠일이 없다. 그래서 찾지 않아도 된다. 다른 유저들과
   email과 username이 겹치는지 체크해야한다. 그래서 바꾼다면 이미 존재한다고 말하지말고 바꾼내용이 없다고 오류를 전달해야겠다.
5. 내가 원하는건 결국 email username 하나만 고쳐도 바뀌게 하는건데 쉽지 않다. 단순하게 생각하면 두번 찾고 고치면 된다. 너무 비효율적이라고 생각
   나는 이미 unique니까 나를 제외하고 form에서 받아온값으로 찾으면 될 거같은데.. 이건 보류 일단 or 연산자를 이용해 고치게하자.
   ✔문제는 2개를 한번에 고쳐야한다.

4일차

1. 부가적인 기능들 구현. video를 올리고 가능하면 github 로그인 까지!
   express.static 메소드를 이용해 정적 파일을 제공하고 multer로 비디오를 저장! 이후 path를 이용해 저장된 비디오 파일을 video 태그 src와 연결하면서 비디오를 보여준다.

2. URLSearchParams(객체) 인터페이스는 URL의 쿼리 문자열에 대해 작업할 수 있는 유틸리티 메서드를 정의합니다.(mdn)
   관련 mdn https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
   Constructor URLSearchParams()
   Methods
   append() 파라미터를 url에 추가
   delete()
   entries()
   forEach()
   get()
   getAll()
   has()
   keys()
   set()
   sort()
   toString() 우리는 이것을 사용! URLSearchParams 객체를 string 로 바꾼다
   values()

   axios github https://github.com/axios/axios

3. 깃허브 로그인 로직
   1. 유저 세팅에서 developer에서 new OAuth Apps을 만들고 유저키와 아이디를 받는다.
   2. 클라이언트를 GET https://github.com/login/oauth/authorize get 메소드로 이 url로 보낸다. 물론 필수적인 client_id와 다양한 옵션들이 있다.
   3. 이후 클라이언트가 정보 제공을 동의하면 우리는 new OAuth Apps에서 정한 url로 쿼리에 코드를 가지고 redirect 된다.
   4. 이후 redirect 된 url에 이어 바로 post 메소드를 이용해 client_id, key ,code를 가지고 post 요청을 https://github.com/login/oauth/access_token 파라미터와 함께 보낸다. 이후 여기서 access_token을 빼낸다.
   5. GET https://api.github.com/user 토큰과 함께 api에 접근한다
   6. 그러면 api에서 data를 보낸다. 그 데이터를 바탕으로 유저를 생성!!!
