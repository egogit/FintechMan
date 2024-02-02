import styled from "styled-components";

const FooterStyle = styled.div`
    background-color: #79EDFF;
    height: 30px;
    color: black;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px'
`

function Footer(props){

    return(
        <FooterStyle>
            ©2024 Copyright Hymin
        </FooterStyle>
    )
}

export default Footer;