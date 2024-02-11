import styled from "styled-components";

import FMLogin from "../components/FMLogin";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

function Login(){
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated === true){
            navigate('/')
        }
    });

    return(
        <LoginContainer>
            <FMLogin/>
        </LoginContainer>
    )
}

export default Login;