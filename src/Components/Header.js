import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
//현재 styled는 local

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;
//이렇게 스타일을 포함하는 컴포넌트를 만든다. ``백틱안 css를 작성 styled. 뒤에 태그를 적는다

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")}; //props current 경로를 검사!!! sc에 prop을 전달하는 방법!
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`; //이렇게 해야지 Link를 css가 들어간 컴포넌트인 SLink 태그로 사용가능.

//withRouter을 사용해서 props에 접근가능! 그러면 props 안에 location, history등 객체 접근가능!
//location 객체 안에 pathname 프로퍼티를 가져온다. 현재 클라이언트의 url을 보여주는 프로퍼티!
export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
//sc (styled components) 에게 props를 줄 수 있다.
