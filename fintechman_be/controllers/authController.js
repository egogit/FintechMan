const bcrypt = require('bcrypt');
const pool = require('../database/connect/maria');

require('dotenv').config();

const checkValidation = async (uid, password) => {

    let errmsg= '';
    
    if(!uid || uid.length > 41){
      errmsg = '��ȿ���� ���� id�Դϴ�.'
    }else if(!password || password.length > 16){
      errmsg = '��ȿ���� ���� password�Դϴ�.'
    }
    
    return errmsg;
}

// �ߺ� ID üũ api ����� 

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
                resMsg = JSON.stringify({'status': 'error', 'msg': '�ش��ϴ� ���̵� ������ �����ϴ�.'});
            }else if(result.length === 1){
                const hashpassword = result[0].password;
                
                const validation = bcrypt.compareSync(password, hashpassword);
                
                if(validation){
                    resMsg = JSON.stringify({'status': 'success', 'msg': '�α��εǾ����ϴ�.'});
                }else{
                    resMsg = JSON.stringify({'status': 'error', 'msg': '�ش��ϴ� ���̵� ������ �����ϴ�.'});
                }
            }else{
                resMsg = JSON.stringify({'status': 'error', 'msg': '�ߺ��� ID�� �����մϴ�.'});
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
                resMsg = JSON.stringify({'status': 'success', 'msg': 'ȸ�������� �����Ͽ����ϴ�.'});
            }else{
                resMsg = JSON.stringify({'status': 'error', 'msg': 'ȸ�����Կ� �����Ͽ����ϴ�.'});
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