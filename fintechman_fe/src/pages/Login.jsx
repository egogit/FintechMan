import styled from "styled-components";

import FMLogin from "../components/FMLogin";

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

function Login(){
    return(
        <LoginContainer>
            <FMLogin/>
        </LoginContainer>
    )
}

export default Login;