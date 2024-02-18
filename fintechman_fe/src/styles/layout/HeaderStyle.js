import styled from 'styled-components';

const HeaderLayout = styled.div`
  background-color: #434447;
  opacity: 0.7;
  height: 80px;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  jusify-content: space-between;
  height: 100%;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: ${props =>
    props.$align === 'left' ? 'flex-start' : 'flex-end'};
  margin-left: ${props => (props.$align === 'left' ? '10px' : '0px')};
  margin-right: ${props => (props.$align === 'right' ? '10px' : '0px')};
`;

export { HeaderLayout, HeaderContainer, HeaderWrapper };
