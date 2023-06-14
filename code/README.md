REACT를 연습을 위해 시작!!!!

컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순

1. jsconfig.js 설정 파일을 통해서 기본적으로 src폴더를 보여준다
2. Fragments 는 내가 원하는 만큼 컴포넌트를 return 가능하게 한다
3. Composition 은 두 개 이상의 route를 렌더링하는 방식이다
4. switch는 오직 한번의 route만 render 시킨다!!!
5. 파일이름.module.css 면 css를 global아닌 local하게 적용시킬 수 있다.!!! 물론 create-react-app으로 시작한 프로젝트 한도 내에서
6. Link를 Router 밖에 쓰면 안된다.
7. styled-reset은 sc를 이용해서 css를 초기화시켜 깨끗한 상태에서 시작
8. withRouter는 다른 컴포넌트를 감싸는 컴포넌트이다
9. Router을 사용시 각각의 Route props에서 match, location, history라는 객체를 받는다. (history api)에 접근!
10. 리액트에서 컨테이너와 프리젠터 패턴!!
    컨테이너 : data와 state(상태값)를 가지고, api를 호출, 기타 모든 로직들을 처리.
    프리젠터 : 컨테이너가 처리한 데이터들을 화면에 뿌려주는 역할을 하는 함수형 컴포넌트
    프리젠터는 state(상태값), api, 클래스 등을 다루지 않음. (state가 없으니 당연히 클래스도 다루지 않는다.)
11. //history.push 는 path를 이용해 원하는 컴포넌트로 이동한다.(props 안에 history)
12. //mdn : super 키워드는 부모 오브젝트의 함수를 호출할 때 사용됩니다. this 키워드가 사용되기 전에 호출되어야 합니다. // super() 부모 클래스의 생성자
13. 커밋 삭제하고 가지고 놀다가 커밋들이 이상하게 꼬였다. 원리가 생각보다 어려운듯.

14. children props 는( ex <Section>movie<Section> )이런 태그 사이 값을 받는다
    if문 대신 && 조건부 렌더링!! { count && <h1>Messages: {count}</h1>} 예시 count 가 true 면 뒤가 실행
    컴포넌트는 항상 true
15. error 가 발생한경우와 검색해서 결과가 없는경우를 나누기 위해 error이 아니라 Message 컴포넌트를 만들었다.
