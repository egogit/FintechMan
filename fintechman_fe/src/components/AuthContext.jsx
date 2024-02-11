import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const baseURL ="http://localhost:4000/api/auth";

    axios.defaults.withCredentials = true;

    useEffect(() => {

        axios.get(baseURL+'/checkSession')
            .then((res) => {
            console.log(res);
            (res.data.status==='success') ? setIsAuthenticated(true) : setIsAuthenticated(false);

        }).catch((err) => {
            console.log(err);
            alert("오류가 발생하였습니다.");
            setIsAuthenticated(false);

        }).finally(() => {

        })
    },[])

    // const logInHandler = (id, password) => {

    //     if(!id){
    //         alert('아이디를 입력해주세요.'); 
    //     }else if(!password){
    //         alert('패스워드를 입력해주세요.');
    //     }else{
    //         axios.post(baseURL+'/login',{
    //             uid: id,
    //             password: password
    //         }).then((res) => {
    //             if (res.data.status === 'success'){
    //                 setIsAuthenticated(true).then(() => {
    //                     return true;
    //                 })
    //             }else{
    //                 if(res.data.msg === '이미 로그인 세션이 존재합니다.'){
    //                     setIsAuthenticated(true).then(() => {
    //                         return true;
    //                     })
    //                 }
    //                 setIsAuthenticated(false);
    //                 alert(res.data.msg);
    //                 return false;
    //             }
    //         })
    //         .catch((err) => {
    //             setIsAuthenticated(false);
    //             alert(err);
    //             console.error(err);
    //             return false;
    //         })
    //     }
    // }

    // const logOutHandler = () => {

    //     axios.post(baseURL+'/logout')
    //     .then((res) => {
    //         if (res.data.status === 'success'){
    //             return true;
    //         }else{
    //             alert(res.data.msg);
    //             return false;
    //         }
    //     })
    //     .catch((err) => {
    //         alert(err);
    //         console.error(err);
    //         return false;
    //     })
    // }

    return(
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};