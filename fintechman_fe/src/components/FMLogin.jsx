import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/icon/fintechman.png"

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


function FMLogin(props){

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const changeId = (e) => {
        setId(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const loginHandler = (e) => {
        e.preventDefault();  // 관련 내용 기록하기.

        if(!id){
            alert('아이디를 입력해주세요.');
        }else if(!password){
            alert('패스워드를 입력해주세요.');
        }else{
            if(id == 'admin' && password == "1234"){
                navigate('/');
            }else{
                setId('');
                setPassword('');
                alert("해당하는 로그인 정보가 없습니다.");
            }
        }
    }
    
    const registerHandler = () => {
    
    }

    return(
        <>
            <img src={logo} alt="FintechMan"/>

            <LoginForm>
                <h3>로그인</h3>
                <div>
                    <LoginInput type="text" placeholder='id' value={id} onChange={changeId} />
                    <Blank/>
                    <LoginInput type="password" placeholder='password' value={password} onChange={changePassword} />
                </div>
                <Blank/>
                <SubmitForm>
                    <input type="submit" value="로그인" onClick={loginHandler}/>
                    <input type="submit" value="회원가입" onClick={registerHandler}/>
                </SubmitForm>
            </LoginForm>
        </>
    )

}

export default FMLogin;