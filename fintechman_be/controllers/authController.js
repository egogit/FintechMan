const bcrypt = require('bcrypt');
const pool = require('../database/connect/maria');

require('dotenv').config();

const checkValidation = async (uid, password) => {

    let errmsg= '';
    
    if(!uid || uid.length > 41){
      errmsg = '아이디: 유효하지 않은 id입니다.'
    }else if(!password || password.length > 16){
      errmsg = '패스워드: 유효하지 않은 password입니다.'
    }
    
    return errmsg;
}

const login = async (req, res) => {
    let conn;
    let resMsg="";
    
    const uid = req.body.uid;
    const password = req.body.password;
    
    const errmsg = await checkValidation(uid, password);
    
    if(errmsg){
        const err = JSON.stringify({'status': 'error', 'msg': errmsg});
        res.send(err);
        
    }else{
        try{
            conn = await pool.getConnection();
            const result = await conn.query(
                'SELECT password FROM WEB_USER_INFO WHERE uid=(?)',[uid]);
                
            if (result.length === 0){
                resMsg = JSON.stringify({'status': 'error', 'msg': '해당하는 아이디 정보가 없습니다.'});
            }else if(result.length === 1){
                const hashpassword = result[0].password;
                
                const validation = bcrypt.compareSync(password, hashpassword);
                
                if(validation){
                    req.session.user = uid;

                    req.session.save(() => {

                    })

                    resMsg = JSON.stringify({'status': 'success', 'data':req.session.user, 'msg': '로그인되었습니다.'});
                }else{
                    resMsg = JSON.stringify({'status': 'error', 'msg': '해당하는 아이디 정보가 없습니다.'});
                }
            }else{
                resMsg = JSON.stringify({'status': 'error', 'msg': '중복된 ID가 존재합니다.'});
            }
            await conn.release();
            
            return res.send(resMsg);
            
        }catch(err){
            console.error(err);
            
            resMsg = JSON.stringify({'status': 'error', 'msg': err});

            if(conn){
                await conn.release();
            }
            
            return res.status(500).send(resMsg);
        }
    }
}

const register = async(req, res) => {
    let conn;
    let resMsg="";
    
    const uid = req.body.uid;
    const password = req.body.password;
    
    const errmsg = await checkValidation(uid, password);
    
    if(errmsg){
        const err = JSON.stringify({'status': 'error', 'msg': errmsg});
        res.send(err);
        
    }else{
        const saltRounds = parseInt(process.env.AUTH_SALTROUNDS) || 10;
        const encPassword = bcrypt.hashSync(password, saltRounds);
      
        try{
            conn = await pool.getConnection();
            const result = await conn.query(
                'INSERT INTO WEB_USER_INFO(uid, password) VALUES(?, ?)',[uid, encPassword]);
                
            if(result){
                resMsg = JSON.stringify({'status': 'success', 'msg': '회원가입을 성공하였습니다.'});
            }else{
                resMsg = JSON.stringify({'status': 'error', 'msg': '회원가입에 실패하였습니다.'});
            }
            
            await conn.release();
            
            return res.send(resMsg);
            
        }catch(err){
            console.error(err);
            
            resMsg = JSON.stringify({'status': 'error', 'msg': err});

            if(conn){
                await conn.release();
            }
            
            return res.status(500).send(resMsg);
        }
    }
}

const checkDuplicateId = async(req, res) => {
    let conn;
    let resMsg="";
    
    const uid = req.body.uid;
    
    const errmsg = await checkValidation(uid, "default");
    
    
    if(errmsg){
        const err = JSON.stringify({'status': 'error', 'msg': errmsg});
        res.send(err);
        
    }else{

        try{
            conn = await pool.getConnection();
            const result = await conn.query(
                'SELECT uid FROM WEB_USER_INFO WHERE uid=(?)',[uid]);
                
            if(result.length == 0){
                resMsg = JSON.stringify({'status': 'success', 'msg': '아이디: 사용가능한 id입니다.'});
            }else{
                resMsg = JSON.stringify({'status': 'error', 'msg': '아이디: 사용할 수 없는 id입니다. 다른 아이디를 입력해 주세요.'});
            }
            
            await conn.release();
            
            return res.send(resMsg);
            
        }catch(err){
            console.error(err);
            
            resMsg = JSON.stringify({'status': 'error', 'msg': err});

            if(conn){
                await conn.release();
            }
            
            return res.status(500).send(resMsg);
        }
    }
}

const logout = async (req, res) => {
    
    let resMsg="";

    if(!req.session.user){
        resMsg = JSON.stringify({'status': 'error', 'msg': "세션이 존재하지 않습니다."});
    }else{
        req.session.destroy(err => {
            if(err){
                resMsg = JSON.stringify({'status': 'error', 'msg': "로그아웃 과정에서 문제가 발생하였습니다."});
            }
        });
        resMsg = JSON.stringify({'status': 'success', 'msg': "로그아웃되었습니다."});
    }

    return res.send(resMsg);
}

const checkSession = async (req, res) => {

    if(req.session.user){
        resMsg = JSON.stringify({'status': 'success', 'msg': "세션이 존재합니다."});
    }else{
        resMsg = JSON.stringify({'status': 'error', 'msg': "세션이 존재하지 않습니다."});
    }

    return res.send(resMsg);
}

module.exports = {
    login,
    register,
    checkDuplicateId,
    logout,
    checkSession
};