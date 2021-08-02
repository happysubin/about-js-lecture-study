import React from "react";
import { Link } from "react-router-dom";
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
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`; //이렇게 해야지 Link를 css가 들어간 컴포넌트인 SLink 태그로 사용가능.

export default () => {
  return (
    <Header>
      <List>
        <Item>
          <SLink to="/">Movies</SLink>
        </Item>
        <Item>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item>
          <SLink to="/search">Search</SLink>
        </Item>
      </List>
    </Header>
  );
};
