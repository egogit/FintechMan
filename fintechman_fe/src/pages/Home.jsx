import styled from "styled-components";
import { useState } from "react";

import Header from "../components/Header";
import FMSidebar from "../components/FMSidebar";
import FMContent from "../components/FMContent";
import FMContainer from "../components/FMContainer";
import Footer from "../components/Footer";

const HomeContainer = styled.div`
    height: 100%;
`

function Home(props){
    const [isOpened, setIsOpened] = useState(false);

    const toggleSidebar = () => {
        setIsOpened(!isOpened);
    }

    return(
        <HomeContainer>
            <Header toggleSidebar={toggleSidebar}/>
            <FMContainer>
                <FMSidebar isOpened={isOpened}/>
                {
                    props.notFound ? <div>404 Not Found</div> : <FMContent isOpened={isOpened}/>
                }
            </FMContainer>
            <Footer/>
        </HomeContainer>
    )
}

export default Home;