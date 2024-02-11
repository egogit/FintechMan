import styled from "styled-components";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

import StyledHeader from "../ui/StyledHeader";
import logo from "../fintechman.svg";
import menu from "../assets/icon/hamburgermenu.png";
import logout from "../assets/icon/logout.png";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

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

    const { isAuthenticated, setIsAuthenticated} = useAuth();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const logoutHandler = (e) => {
        e.preventDefault();

        const baseURL ="http://localhost:4000/api/auth";

        axios.post(baseURL+'/logout')
        .then((res) => {
            if (res.data.status === 'success'){
                //pass
            }else{
                alert(res.data.msg);
            }
        })
        .catch((err) => {
            alert(err);
            console.error(err);
        }).finally(() => {
            setIsAuthenticated(false)
            navigate('/login');
        })
    }

    return(
        <StyledHeader>
            <div>
                <MenuStyle src={menu} alt="menu" onClick={props.toggleSidebar}/>
            </div>
            <div>
                <Link to="/"><LogoStyle src={logo} alt="logo"/></Link>
            </div>
            <div>
                <MenuStyle src={logout} alt="logout" onClick={logoutHandler}/>
            </div>
        </StyledHeader>
    )
}

export default Header;