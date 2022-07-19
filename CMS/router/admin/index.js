const express=require("express");
const router=express.Router();

//渲染index页面
router.get("/",(req,res)=>{
    // res.render("admin/index");
     res.render("admin/index",{username:req.session.userinfo.username});
})

module.exports=router;