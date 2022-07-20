const express = require('express');
const router = express.Router();

//解析POST数据（使用 express 内置中间件）
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//登录验证(路由中间件)
router.use((req, res, next) => {
    if (req.url.includes('login')) {
        next();
        return;
    }
    if (req.session.userinfo) {
        next();
    } else {
        res.redirect('/admin/login');
    }
});

//注册登录模块
const loginRouter = require('./admin/login');
router.use('/login', loginRouter);

//index模块
const indexRouter = require('./admin/index');
router.use('/index', indexRouter);

//导航路由模块
const navRouter = require('./admin/nav');
router.use('/nav', navRouter);

//房源模块
const homeRouter = require('./admin/home');
router.use('/home', homeRouter);

//代理人模块
const agentRouter = require('./admin/agent');
router.use('/agent', agentRouter);

//专题模块
const specialRouter = require('./admin/special');
router.use('/special', specialRouter);

//轮播图模块
const bannerRouter = require('./admin/banner');
router.use('/banner', bannerRouter);

//项目分类模块
const projectRouter = require('./admin/project');
router.use('/project', projectRouter);

//数据可视化
const echartsRouter = require('./admin/echarts');
router.use('/echarts', echartsRouter);

module.exports = router;
