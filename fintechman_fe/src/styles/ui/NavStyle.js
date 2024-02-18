import styled from 'styled-components';

const NavWrapper = styled.div`
  height: 34px;
  text-align: left;
  align-items: center;
  padding-right: ${props => (props.$align === 'left' ? '20px' : '0px')};
  padding-left: ${props => (props.$align === 'right' ? '20px' : '0px')};
  position: relative;
`;

const NavBox = styled.div`
  height: 34px;
  width: 80px;
  color: white;
  cursor: pointer;
  transform: translate(0, +30%);
`;

export { NavWrapper, NavBox };
