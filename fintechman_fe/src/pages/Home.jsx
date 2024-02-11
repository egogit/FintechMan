import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import FMSidebar from "../components/FMSidebar";
import FMContent from "../components/FMContent";
import FMContainer from "../components/FMContainer";
import Footer from "../components/Footer";
import { useAuth } from "../components/AuthContext";

const HomeContainer = styled.div`
    height: 100%;
`

function Home(props){
    const [isOpened, setIsOpened] = useState(false);
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpened(!isOpened);
    }

    useEffect(() => {
        if(!isAuthenticated) navigate('/login')
    })

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