import styled from "styled-components";
import {Link} from 'react-router-dom';

import StyledHeader from "../ui/StyledHeader";
import logo from "../fintechman.svg";
import menu from "../assets/icon/hamburgermenu.png";
import logout from "../assets/icon/logout.png";

const LogoStyle = styled.img`
    width: 180px;
    height: 100px;
    cursor: pointer;
`

const MenuStyle = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`

function Header(props){

    return(
        <StyledHeader>
            <div>
                <MenuStyle src={menu} alt="menu" onClick={props.toggleSidebar}/>
            </div>
            <div>
                <Link to="/"><LogoStyle src={logo} alt="logo"/></Link>
            </div>
            <div>
                <MenuStyle src={logout} alt="logout"/>
            </div>
        </StyledHeader>
    )
}

export default Header;