const express=require("express");
const router=express.Router();
//连接数据库
const db=require("../../db/index");
//加密
const crypto=require("crypto-js");

//导入表单数据验证中间件
const expressJoi=require("@escook/express-joi");
//导入验证规则
const {login_schema}=require("../../schema/login");

//加密
//var a=crypto.AES.encrypt("123456","architect").toString();
//解密
//  var b=crypto.AES.decrypt(a,"architect").toString(crypto.enc.Utf8);

//渲染登录页面
router.get("/",(req,res)=>{
    res.render("admin/login");
})
//登录功能router.post("/",expressJoi(login_schema)，(req,res)=>{}未实现
//登录功能
router.post("/",(req,res)=>{
    const {username,password}=req.body;
    //操作数据库
    const sql="select * from admin";
    db.query(sql,(err,results)=>{
        var pass=crypto.AES.decrypt(results[0].password,"architect").toString(crypto.enc.Utf8);   
        if(username==results[0].username&&password==pass){
            req.session.userinfo=results[0];   //存用户信息session
            res.redirect("/admin/index");
        }else{
            res.redirect("/admin/login");
            /*res.send({
                code:0,
                msg:"登录失败"
            })*/
        }
    })
})

router.get("/logout",(req,res)=>{
    //权限清空
    req.session.destroy();
    res.redirect("/admin/login");
})

module.exports=router;