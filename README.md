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

5일차

1. input accept로 받는 파일들을 제한할 수 있다.
2. 개인적으로 multer 을 아바타를 업로드 할 때 파일을 업로드하지 않아도 유지할지 고민했다. 바로 세션 유저에 있는 avatar ulr을 가져와서 삼항연산자를 이용해서 유지시킨다!!! req.file 이 없거나 있거나가 중요! multer router에 미들웨어 안써서 한참 고생했다. 집중!

webpack을 적용한다!!! 오늘은 mongoose populate 도 정리할 예정
먼저 webpack은 자바스크립트 모듈 번들러이다. js의 모듈화를 위한 번들러이다! 우리가 작성한 코드도 멋지게 프론트엔드에서 이해시킨다.
entry는 우리가 처리하고자 하는 파일들이 있다.  
output은 정제된 코드들이 나오는 파일들을 말한다.
https://github.com/babel/babel-loader 바벨로더 사용법 참고.
https://www.npmjs.com/package/sass-loader sass-loader 관련 로더들 사용법 참고
sass sass-loader css-loader style-loader 을 전부 install

https://www.npmjs.com/package/mini-css-extract-plugin mini-css-extract-plugin 사용 문서! js와 분리된 css파일을 만들기 위해 사용.
현재는 js가 css도 처리.

3. 객체 내부 프로퍼티 확인전에 객체가 존재하는 지 확인하자. user 을 체크하면 되는데 user.\_id를 계속 체크하니까 오류가 발생했었다!!!
   mongoose ref에는 모델이 들어가야한다. populate는 오브젝트 아이디를 그 아이디를 가지는 데이터(객체) 로 변환!

6일차

1. video 태그에 controls 프로퍼티를 주면 조작이 가능 ! 대신 못생김 ㅠㅠ
2. nodemon 파일을 만든다! 여기서 nodemon 실행 설정들을 조작. scripts에서 nodemon이라고만 코드를 작성하면 nodemon 내용들을 실행.
   여기서 ignore은 nodemon이 변화를 감지하지 않는 파일들을 의미! 프론트엔드 들을 그렇게 만들었다.
3. scripts에서 webpack라고만 해도 자동으로 webpack.config.js 파일을 실행한다
4. 조회수 기능을 구현하려고한다. 우선 먼저 video 스키마에 view 라는 메타 데이터를 생성한다. 그런 다음 논리를 생각하자
   저번에는 동영상을 다 보면 조회수가 오르게 구현했으니 이번엔 페이지에 들어가기만 해도 조회수가 오르도록 구현해보려고한다. 그러면 조회수를 올리려면 어떻게 해야할까 우선 들어가면 비디오 조회수가 오르게 해야한다. 그러면 아이디를 이용해서 비디오를 올려야한다. 여기서 아이디를 어떻게 가져올것인가?
   첫번째는, url 을 가져와서 id 를 꺼내 id 를 백엔드에 요청을 보내며 백엔드에서 비디오를 찾고 그 비디오의 조회수를 증가시키는 방법이다.
   두번째는, html data-attribute를 이용해 video id 를 가져와서 그 아이디로 백엔드에 요청을 보내고 마찬가지로 아이디로 비디오를 찾고 조회수를 증가시킨다.

7일차

1. 우리 웹사이트에서 비디오 촬영이 가능하고 그 비디오를 저장하는 것까지 복습해보자.
   출처 mdn https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
2. Navigator.mediaDevices 읽기 전용 속성은 카메라, 마이크, 화면 공유와 같이 현재 연결된 미디어 입력 장치에 접근할 수 있는 MediaDevices 객체를 반환합니다.
   .MediaDevices 인터페이스는 카메라, 마이크, 공유 화면 등 현재 연결된 미디어 입력 장치로의 접근 방법을 제공하는 인터페이스입니다. 다르게 말하자면, 미디어 데이터를 제공하는 모든 하드웨어로 접근할 수 있는 방법입니다.
   getUserMedia()
   사용자에게 권한을 요청한 후, 시스템의 카메라와 오디오 각각 혹은 모두 활성화하여, 장치의 입력 데이터를 비디오/오디오 트랙으로 포함한 MediaStream (en-US)을 반환합니다.
   개념 숙지 완료! Navigator.mediaDevices.getUserMedia()를 통해 우리 컴퓨터의 카메라 오디오 미디어의 스트림을 가져옵니다.
3. HTMLMediaElement.srcObject mdn
   srcObject객체에 스트림 값을 할당.이걸 이용해야 프리뷰를 보는 게 가능하당.
   현재 HTMLMediaElement 객체에서 재생 중이거나 재생 되었던 미디어를 표현하는 MediaStream 객체를 반환합니다. 원본은 우리 컴퓨터에서 가져온다.
   HTMLMediaElement 인터페이스의 srcObject 속성은 HTMLMediaElement와 연결된 미디어의 원본 역할을 하는 개체를 설정하거나 반환합니다. 개체는 MediaStream, MediaSource, Blob 또는 파일(Blob에서 상속됨)일 수 있습니다.
   이후 htmlmediaelement.play() 를 이용하면 동영상이 보인다.
4. MediaRecorder 는 미디어를 저장할 수 있다.
5. recorder.ondataavailable는 recording 이 끝나면 이 이벤트가 실행된다.
6. URL.createObjectURL()의 매개변수는 object 객체 URL을 생성할 File, Blob, MediaSource (en-US) 객체를 필요로합니다. video src에 넣을 url을 만듭니다.
7. 비디오 srcObjetc 를 없애고 src에 URL을 넣고 비디오를 반복시키고 재생하면 프리뷰가 생긴다. 다운로드는 html로 속임수를 줘서 간단하게 다운로드한다!

8일차 배운것들을 이용해서 댓글 기능을 구현!
먼저 댓글 모델을 만든다. 프론트엔드에서 백엔드에 ajax 요청!
http 헤더는 요청에 세부사항, 옵션들을 포함하고 있다.
보통 json 형식을 이용해 백엔드와 프론트엔드가 요청과 응답을 주고 받는다. 형식을 지정하지 않으면 text 파일로 전송된다.
그러므로 오브젝트에 정보를 담아서 넘길때 JSON.stringfy 를 이용해 문자열로 변환해서 넘긴다.
headers 안에 "Content-Type": "application/json"우리가 넘긴 파일이 json 형식임을 알려준다.
미들웨어 express.json() 을 이용해 문자열로 넘어온 요청들을 다시 json 형식으로 바꾼다( 디코딩한다,)
html element 들을 이용해서 즉석에서 fake 댓글들을 구현. 그러나 그냥 element들을 input value에서 가져온 것들로 잠깐 만드는거지 db에서 가져온 데이터를 렌더링하는 것이 아니다!

중요포인트!
ul 과 li에 담아서 댓글을 보여준다. 우리는 이 댓글을 가져와야하는데 아이디가 아닌 클래스를 이용한다. 만약 쿼리 셀렉터를 이용하려면 쿼리 셀렉터 all로 받아야한다. 댓글은 1개가 아니라 여러개이므로 아이디를 주어서도 안돼고 쿼리셀렉터로 한가지만 가져와도안된다.
따라서 getElementsByClassName, 쿼리셀렉터all 메소드를 이용해서 전부 가져와야한다.
