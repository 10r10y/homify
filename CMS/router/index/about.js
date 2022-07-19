const express=require("express");
const router=express.Router();
const db=require("../../db/index");

//渲染页面
router.get("/",(req,res)=>{
    let agent,special;
    const sqlAgent='select agent_id,agent_name,agent_content,agent_img from agent where agent_time>=20';
    db.query(sqlAgent,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            agent=results;
        }
    })
    const sqlSpecial='select special_id,special_title,special_content,special_img from special where is_show=1';
    db.query(sqlSpecial,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            special=results;
        }
    })
    setTimeout(function(){
        res.render("index/about",{agent,special});
      },500)
})

module.exports=router;