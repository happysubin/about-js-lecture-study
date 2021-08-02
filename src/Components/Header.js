import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header``;

const List = styled.ul`
  display: flex;
  &:hover {
    background-color: blue;
  }
`;

const Item = styled.li``;

const SLink = styled(Link)``;
//이렇게 스타일을 포함하는 컴포넌트를 만든다. ``백틱안 css를 작성 styled. 뒤에 태그를 적는다

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
