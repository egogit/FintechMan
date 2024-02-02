import styled from "styled-components";

const HeaderStyle = styled.div`
    background-color: #79EDFF;
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
`

function StyledHeader(props){

    return(
        <HeaderStyle>
            {props.children}
        </HeaderStyle>
    )
}

export default StyledHeader;