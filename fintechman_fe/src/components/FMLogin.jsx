import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import FMRegister from "./FMRegister";
import logo from "../assets/icon/fintechman.png";
import { useAuth } from './AuthContext';

const LoginForm = styled.form`
    background-color: #303030;
    height: 300px;
    width: 300px;
    color: white;
    text-align: center;
    margin-bottom: 10px;
`

const LoginInput = styled.input`
    background-color: #303030;
    border-width: 0 0 1px 0;
    border-bottom-color: white;
    width: 90%;
    color: white;
`

const Blank = styled.div`
    height: 30px;
`

const SubmitForm = styled.div`
    text-align: right;
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${({ showModal }) => (showModal ? "flex" : "none")};
    justify-content: center;
    align-items: center;
`

const ModalContent = styled.div`
    background-color: #303030;
    padding: 20px;
    border-radius: 5px;
`

function FMLogin(props){

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, setIsAuthenticated} = useAuth();

    axios.defaults.withCredentials = true;

    const baseURL ="http://localhost:4000/api/auth";
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const changeId = (e) => {
        setId(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const loginHandler = (e) => {
        e.preventDefault();

        if(!id){
            alert('아이디를 입력해주세요.'); 
        }else if(!password){
            alert('패스워드를 입력해주세요.');
        }else{
            axios.post(baseURL+'/login',{
                uid: id,
                password: password
            }).then((res) => {
                if (res.data.status === 'success'){
                    setIsAuthenticated(true)
                    navigate('/');
                }else{
                    if(res.data.msg === '이미 로그인 세션이 존재합니다.'){
                        setIsAuthenticated(true)
                        navigate('/');
                    }
                    setIsAuthenticated(false);
                    alert(res.data.msg);
                }
            })
            .catch((err) => {
                setIsAuthenticated(false);
                alert(err);
                console.error(err);
            })
            .finally(() => {
                setId('');
                setPassword('');
            })
        }
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const overlayClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    return(
        <>
            <img src={logo} alt="FintechMan"/>

            <LoginForm>
                <h3>로그인</h3>
                <div>
                    <LoginInput type="text" placeholder='id' value={id} maxLength="41" onChange={changeId} />
                    <Blank/>
                    <LoginInput type="password" placeholder='password' value={password} maxLength="16" onChange={changePassword} />
                </div>
                <Blank/>
                <SubmitForm>
                    <input type="submit" value="로그인" onClick={loginHandler}/>
                    <input type="button" value="회원가입" onClick={openModal}/>
                </SubmitForm>
            </LoginForm>

            <ModalOverlay showModal={showModal} onClick={overlayClickHandler}>
                <ModalContent>
                    <FMRegister closeModal={closeModal} showModal= {showModal} />
                </ModalContent>
            </ModalOverlay>
        </>
    )

}

export default FMLogin;