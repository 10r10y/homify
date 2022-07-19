const express=require("express");
const router=express.Router();
const db=require("../../db/index");

//渲染页面
router.get("/",(req,res)=>{
    const search=req.query.search;
    let {limit=3,page=1}=req.query;
    let project,totalPage,pc;
    let offset=(page-1)*limit;
    //查询总数
    const sqlTotal=`select count(*) from project where is_delete=0`;
    db.query(sqlTotal,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            totalPage=Math.ceil(results[0]['count(*)']/limit);
            
        }
    })
    //渲染页面
    const sqlProject=`select project_location,project_title,project_thumb,p_kitchen,p_toilet,p_bedchamber,p_Livingroom,p_parkingspace,project_price from project where is_delete=0 limit ${offset},${limit}`;
    db.query(sqlProject,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            project=results;
        }
    })
    //查找
    const sql=`select * from project where project_title like '%${search}%' and is_delete=0 limit ${offset},${limit}`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            project=results;
        }
     })
     //类型
     const sqlPc=`select pc_name from project_cate where is_delete=0`;
     db.query(sqlPc,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
         if(results.length!=0){
             pc=results;
         }
     })
    
    setTimeout(function(){
        res.render("index/list",{project,totalPage,page,pc});
      },500)
})


module.exports=router;