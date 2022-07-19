const express=require("express");
const router=express.Router();
const db=require("../../db/index");

//渲染页面
router.get("/",(req,res)=>{
    let home,project,agent;
    const sqlHome='select home_id,home_name,home_img,home_location,home_content,home_price,home_content,kitchen,toilet,bedchamber,Living_room,parking_space from home order by home_sort asc';
    db.query(sqlHome,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            home=results;
        }
    })
    const sqlProject='select * from project order by project_id desc limit 0,1';
    db.query(sqlProject,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            project=results;
            
        }
    })
    const sqlAgent='select * from agent order by agent_id desc limit 0,1';
    db.query(sqlAgent,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            agent=results;
        }
    })
    setTimeout(function(){
        res.render("index/single",{home,project,agent});
      },500)
})


module.exports=router;