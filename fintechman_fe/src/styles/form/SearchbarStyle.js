import styled from 'styled-components';

const SearchbarContainer = styled.div`
  height: 45px;
  width: 400px;
  text-align: left;
  align-items: center;
  background-color: #131722;
  border-radius: 5px;
  display: flex;
`;

const SearchWrapper = styled.div`
  width: 400px;
  text-align: left;
  align-items: center;
  padding: 5px;
  padding-left: 10px;
  display: flex;
`;

const SearchIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const SearchbarBox = styled.input`
  height: 20px;
  width: 100%;
  border: None;
  padding-left: 5px;
  background-color: #131722;
  color: white;

  &:focus {
    outline: none;
  }
`;

export { SearchbarContainer, SearchWrapper, SearchIcon, SearchbarBox };
