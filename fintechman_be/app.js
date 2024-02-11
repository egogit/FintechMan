const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const pool = require('./database/connect/maria');
const routes = require('./routes');
require('dotenv').config();

const app = express();

var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const sessionStore = new MySQLStore(options);

app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(session({
    key: "user",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

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
