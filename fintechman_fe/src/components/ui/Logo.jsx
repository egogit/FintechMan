import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LogoWrapper, LogoBox } from '../../styles/ui/LogoStyle';
import logo from '../../assets/icon/FintechMan-logo-white.png';

function Logo(props) {
  const { to, alt } = props;

  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate(to);
  };

  return (
    <LogoWrapper>
      <LogoBox src={logo} alt={alt} onClick={logoClickHandler} />
    </LogoWrapper>
  );
}

Logo.propTypes = {
  to: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Logo;
