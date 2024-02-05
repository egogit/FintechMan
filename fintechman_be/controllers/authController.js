const bcrypt = require('bcrypt');
const pool = require('../database/connect/maria');

require('dotenv').config();

const checkValidation = async (uid, password) => {

    let errmsg= '';
    
    if(!uid || uid.length > 41){
      errmsg = '유효하지 않은 id입니다.'
    }else if(!password || password.length > 16){
      errmsg = '유효하지 않은 password입니다.'
    }
    
    return errmsg;
}

// 중복 ID 체크 api 만들기 

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
                    resMsg = JSON.stringify({'status': 'success', 'msg': '로그인되었습니다.'});
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
        const saltRounds = parseInt(process.env.AUTH_SALTROUNDS);
        const salt = bcrypt.genSaltSync(saltRounds);
        const encPassword = bcrypt.hashSync(password, salt);
      
        try{
            conn = await pool.getConnection();
            const result = await conn.query(
                'INSERT INTO WEB_USER_INFO(uid, salt, password) VALUES(?, ?, ?)',[uid, salt, encPassword]);
                
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

module.exports = {
    login,
    register
};