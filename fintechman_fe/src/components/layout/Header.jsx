import React from 'react';

import SearchBar from '../form/Searchbar';
import Logo from '../ui/Logo';
import Nav from '../ui/Nav';
import Profile from '../ui/Profile';
import {
  HeaderLayout,
  HeaderContainer,
  HeaderWrapper,
} from '../../styles/layout/HeaderStyle';

function Header() {
  // const { isLogin, isClicked } = props;
  const isLogin = true;

  return (
    <HeaderLayout>
      <HeaderContainer>
        <HeaderWrapper $align="left">
          <Logo to="/" alt="Fintechman" />
          <Nav to="/my/favorite-item" title="관심종목" />
          <Nav to="/my/portfolio" title="포트폴리오" />
          <Nav to="/my/ledger" title="가계부" />
        </HeaderWrapper>
        <HeaderWrapper $align="right">
          <SearchBar />
          {isLogin ? (
            <Profile />
          ) : (
            <Nav to="/login" title="로그인" align="right" />
          )}
        </HeaderWrapper>
      </HeaderContainer>
    </HeaderLayout>
  );
}

export default Header;
