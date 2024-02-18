import React from 'react';

import {
  SearchbarContainer,
  SearchWrapper,
  SearchIcon,
  SearchbarBox,
} from '../../styles/form/SearchbarStyle';
import searchIcon from '../../assets/icon/search.svg';

function SearchBar() {
  return (
    <SearchbarContainer>
      <SearchWrapper>
        <SearchIcon src={searchIcon} alt="" />;
        <SearchbarBox type="text" placeholder="주식, 가상자산 검색" />
      </SearchWrapper>
    </SearchbarContainer>
  );
}

export default SearchBar;
