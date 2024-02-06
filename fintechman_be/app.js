const express = require('express');
const cors = require('cors');

const app = express();
const pool = require('./database/connect/maria');
const routes = require('./routes');

app.set('port', process.env.PORT || 4000);

app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);


app.get('/', (req, res) => {
    res.send('Hello, Express')
});

/*
app.get('/test', async (req, res) => {
    let conn;
    try{
        conn = await pool.getConnection();
        console.log('Connected to the database.');
    }catch(err){
        console.error('Error connecting to the database.');
    }finally{
        if(conn){
            conn.release();
        }
    }
    res.status(200).send();
})
*/

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});
