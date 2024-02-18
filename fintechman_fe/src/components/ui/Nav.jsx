import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NavWrapper, NavBox } from '../../styles/ui/NavStyle';

function Nav(props) {
  const { to, title, align } = props;

  const navigate = useNavigate();

  const navClickHandler = () => {
    navigate(to);
  };

  return (
    <NavWrapper $align={align}>
      <NavBox onClick={navClickHandler}>{title}</NavBox>
    </NavWrapper>
  );
}

Nav.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  align: PropTypes.string,
};

Nav.defaultProps = {
  align: 'left',
};

export default Nav;
