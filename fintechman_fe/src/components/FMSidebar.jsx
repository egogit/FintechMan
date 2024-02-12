import styled from "styled-components";

const SideStyle = styled.div`
    width: '250px';
    height: 100%;
    background-color: #303030;
    transition: transform 0.5s ease; 
    transform: ${props => props.$isOpened ? 'translateX(0)' : 'translateX(-100%)'};
    visibility: ${props => props.$isOpened ? 'none' : 'visible'};
`

const SideGroupStyle = styled.div`
    padding-bottom: 20px;
`

const SideTitleStyle = styled.div`
    padding-left: 20px;
    padding-top: 20px;
    padding-bottion: 20px;
    color: #808080;
`

const SideMenuStyle = styled.div`
    color: white;
    padding: 10px 30px;
`

function FMSidebar(props){

    return(
        <SideStyle $isOpened={props.$isOpened}>
            <SideGroupStyle>
                <SideTitleStyle>전체</SideTitleStyle>
                <SideMenuStyle>전체포트폴리오</SideMenuStyle>
            </SideGroupStyle>
            
            <SideGroupStyle>
                <SideTitleStyle>주식</SideTitleStyle>
                <SideMenuStyle>주식포트폴리오</SideMenuStyle>
                <SideMenuStyle>국내포트폴리오</SideMenuStyle>
                <SideMenuStyle>미국포트폴리오</SideMenuStyle>
                <SideMenuStyle>배당금내역</SideMenuStyle>
                <SideMenuStyle>투자현황</SideMenuStyle>
                <SideMenuStyle>월간이력</SideMenuStyle>
            </SideGroupStyle>

            <SideGroupStyle>
                <SideTitleStyle>코인</SideTitleStyle>
                <SideMenuStyle>코인포트폴리오</SideMenuStyle>
            </SideGroupStyle>

            <SideGroupStyle>
                <SideTitleStyle>부동산</SideTitleStyle>
                <SideMenuStyle>관심경매물건</SideMenuStyle>
            </SideGroupStyle>

            <SideGroupStyle>
                <SideTitleStyle>설정</SideTitleStyle>
                <SideMenuStyle>차트설정</SideMenuStyle>
            </SideGroupStyle>

        </SideStyle>
    )
}

export default FMSidebar;