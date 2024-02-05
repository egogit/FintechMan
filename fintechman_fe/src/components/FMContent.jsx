import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

const ContentStyle = styled.div`
    height: 100%;
`

function FMContent(props){

    const contentRef = useRef();

    const {isOpened} = props.isOpened;

    useEffect(() => {
        if (props.isOpened) {
        contentRef.current.style.width = 'calc(100% - 200px)';
        } else {
        contentRef.current.style.width = '100%';
        }
    }, [isOpened]);

    return(
        <ContentStyle ref={contentRef} isOpened={isOpened}>hi</ContentStyle>
    )
}

export default FMContent;