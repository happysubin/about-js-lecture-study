import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import Tv from "Routes/Tv";
import Search from "Routes/Search";
import Header from "Components/Header"; //이 형태는 기본적으로 folder로 가서 index 파일을 보여준다

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={Tv} />
        <Route path="/search" component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

//path 는 어느 url로 갈지 exact는 정확하게 url이 맞아야간다 react는 /이 중첩되면 여러 url로 갈 수 있다.
//component는 그 url로 들어가면 어떤 컴포넌트를 보여줄지 정하는 것이다.
//route는 router안에서만 사용할 수 있다.
//Router도 1개만 리턴가능해서 fragments를 사용!
//<Redirect from="*" to="/" /> 이 뜻은 해당하는 route가 없다면 /로 redirect 한다는 뜻이다. 정규표현식에서 *를 가져온듯. switch와 사용!!!
//switch는 오직 한번의 route만 render 시킨다!!!
//리액트는 url이 겹치면 겹치는 것을 보여준다. switch로 인해 1개만 보여준다
//만약 /tv /tv/popular이 있으면 /tv route가 먼저 있을 경우 /tv/popular로 진입해도 /tv 라우트가 보여진다. 그래서 exact를 사용해서 정확한 url만 보여주게한다!
