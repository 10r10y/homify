const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const joi = require('joi');
const session = require('express-session');

//配置session
app.use(
    session({
        name: 'session_id',
        secret: 'architect',
        cookie: {
            maxAge: 1000 * 60 * 60 * 60, //过期时间
        },
        resave: false,
        saveUninitialized: true, //首次刷新页面形成cookie
    })
);

//配置静态资源
app.use(express.static('static'));

//配置模板引擎
app.set('views', path.join(__dirname, 'views')); //设置模板存储位置
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//解析POST数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//注册管理端路由
const adminRouter = require('./router/admin');
app.use('/admin', adminRouter);
//注册用户端路由
const indexRouter = require('./router/index');
app.use('/index', indexRouter);

//错误级中间件
app.use(function (err, req, res, next) {
    //joi.ValidationError构造函数   instanceof判断对象是否由构造函数实例化
    if (err instanceof joi.ValidationError) {
        //数据验证失败
        return res.send({
            code: 0,
            msg: err.message,
        });
    } //未知错误
    res.send({
        code: 1,
        msg: err.message,
    });
});

app.listen(3000, () => {
    console.log(`http://localhost:3000/index/index`);
    console.log(`http://localhost:3000/admin/login`);
});
