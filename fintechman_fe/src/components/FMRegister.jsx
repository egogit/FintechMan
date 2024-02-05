import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";

const RegisterForm = styled.form`
    background-color: #303030;
    height: 300px;
    width: 300px;
    color: white;
    text-align: center;
    margin-bottom: 10px;
`

const RegisterInput = styled.input`
    background-color: #303030;
    border-width: 0 0 1px 0;
    border-bottom-color: white;
    font-size: 30px;
    width: 90%;
    color: white;
`

const Blank = styled.div`
    height: 30px;
`

const SubmitButton = styled.input`
    width: 90%;
`

function FMRegister(props) {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const baseURL ="http://localhost:4000/api/auth";

    const { showModal } = props.showModal;

    const changeId = (e) => {
        setId(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const registerHandler = (e) => {
        e.preventDefault();

        if(!id){
            alert('아이디를 입력해주세요.');  // TODO. id중복 check
        }else if(!password){
            alert('패스워드를 입력해주세요.');
        }else{
            axios.post(baseURL+'/register',{
                uid: id,
                password: password
            }).then((res) => {
                if (res.data.status === 'success'){
                    alert(res.data.msg);
                    props.closeModal();
                }else{
                    alert(res.data.msg);
                }
            })
            .catch((err) => {
                alert(err);
                console.error(err);
            })
            .finally(() => {
                setId("");
                setPassword("");
            })
        }
    }

    useEffect(() => {
        setId("");
        setPassword("");
    },[showModal])

    return (
        <RegisterForm>
            <h3>회원가입</h3>
            <div>
                <RegisterInput type="text" placeholder='id' value={id} maxLength="41" onChange={changeId} />
                <Blank/>
                <RegisterInput type="password" placeholder='password' value={password} maxLength="16" onChange={changePassword} />
                <Blank/>
                <SubmitButton type="submit" value="회원가입" onClick={registerHandler}/>
            </div>
        </RegisterForm>
    );
}


export default FMRegister;