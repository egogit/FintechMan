import styled from "styled-components";

const SideStyle = styled.div`
    background-color: #202020;
    height: 1000px;
    display: flex;
`

function FMContainer(props){

    return(
        <SideStyle>
            {props.children}
	    </SideStyle>
    )
}

export default FMContainer;
