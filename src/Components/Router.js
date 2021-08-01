import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "Routes/Home";
import Tv from "Routes/Tv";
import Search from "Routes/Search";

export default () => {
  return (
    <Router>
      <>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={Tv} />
        <Route path="/search" exact component={Search} />
      </>
    </Router>
  );
};

//path 는 어느 url로 갈지 exact는 정확하게 url이 맞아야간다 react는 /이 중첩되면 여러 url로 갈 수 있다.
//component는 그 url로 들어가면 어떤 컴포넌트를 보여줄지 정하는 것이다.
//route는 router안에서만 사용할 수 있다.
//Router도 1개만 리턴가능해서 fragments를 사용!
