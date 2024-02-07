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

const ValidInfo = styled.div`
    color: red;
`

const SubmitButton = styled.input`
    width: 90%;
`

function FMRegister(props) {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isIdValid, setIsIdValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [idValidMsg, setIdValidMsg] = useState("");
    const [passwordValidMsg, setPasswordValidMsg] = useState("");

    const baseURL ="http://localhost:4000/api/auth";

    const changeId = (e) => {
        setId(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const checkIdDuplication = () => {

        axios.post(baseURL+'/checkDuplicateId',{
            uid: id,
        }).then((res) => {
            if (res.data.status === 'error'){
                setIdValidMsg(res.data.msg)
                setIsIdValid(false);
            }else{
                setIdValidMsg("");
                setIsIdValid(true);
            }
        })
        .catch((err) => {
            setIsIdValid(false);
            setIdValidMsg("아이디: 처리중에 에러가 발생하였습니다.");
            console.error(err);
        })
    }

    const registerHandler = (e) => {
        e.preventDefault();

        checkIdValidation();
        checkPasswordValidation();

        if(isIdValid && isPasswordValid){
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

    const checkIdValidation = (e) => {
        const idRegex = /^[a-z0-9_-]{5,20}$/;

        if(!id){
            setIsIdValid(false);
            setIdValidMsg("아이디: 필수 입력 정보입니다.");
        }else if(! idRegex.test(id)){
            setIsIdValid(false);
            setIdValidMsg("아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
        }else{
            checkIdDuplication();
        }
    }

    const checkPasswordValidation = (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-_])[a-zA-Z\d!@#$%^&*()-_]{8,16}$/;

        if(!id){
            setIsPasswordValid(false);
            setPasswordValidMsg("패스워드: 필수 입력 정보입니다.");
        }else if(! passwordRegex.test(password)){
            setIsPasswordValid(false);
            setPasswordValidMsg("패스워드: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해야합니다.");
        }else{
            setIsPasswordValid(true);
        }
    }

    useEffect(() => {
        setId("");
        setPassword("");
        setIdValidMsg("");
        setPasswordValidMsg("");
    },[props.showModal])

    return (
        <RegisterForm>
            <h3>회원가입</h3>
            <div>
                <RegisterInput type="text" placeholder='id' value={id} maxLength="41" onChange={changeId} onBlur={checkIdValidation}/>
                <Blank/>
                <RegisterInput type="password" placeholder='password' value={password} maxLength="16" onChange={changePassword} onBlur={checkPasswordValidation} />
                <ValidInfo>{idValidMsg}</ValidInfo>
                <ValidInfo>{passwordValidMsg}</ValidInfo>
                <Blank/>
                <SubmitButton type="submit" value="회원가입" onClick={registerHandler}/>
            </div>
        </RegisterForm>
    );
}


export default FMRegister;