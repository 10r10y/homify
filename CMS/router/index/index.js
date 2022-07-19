const express=require("express");
const router=express.Router();
const db=require("../../db/index");

//渲染页面
router.get("/",(req,res)=>{ 
    let home,special,agent,project,banner;
    const sqlHome='select home_name,home_img,home_location,home_content,home_price,home_content,kitchen,toilet,bedchamber,Living_room,parking_space from home order by home_sort asc';
    db.query(sqlHome,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            home=results;
        }
    })
    const sqlSpecial='select special_id,special_title,special_content,special_img from special where is_show=1';
    db.query(sqlSpecial,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            special=results;
        }
    })
    const sqlAgent='select agent_id,agent_name,agent_content,agent_img,agent_number,agent_time from agent';
    db.query(sqlAgent,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            agent=results;
        }
    })
    //查询项目
    const sqlProject=`select  project_title,project_thumb,p_kitchen,p_toilet,p_bedchamber,p_Livingroom,p_parkingspace,project_price,project_banner from project where is_delete=0`;
    db.query(sqlProject,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            project=results;
        }
    })
    const sqlBanner=`select banner_img,banner_name from banner order by banner_sort asc`;
    db.query(sqlBanner,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            banner=results;
        }
    })
    setTimeout(function(){
      res.render("index/index",{home,special,agent,project,banner});
    },500)
    
})

module.exports=router;