const express=require("express");
const router=express.Router();
const db=require("../../db/index");

router.get("/",(req,res)=>{
    /**/ 
    let project_cate,project,home,agent;
    const sql='select count(*) from project_cate';
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        project_cate=results[0];  
    })
    const sql1='select count(*) from project';
    db.query(sql1,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        project=results[0];
    })
    const sql2='select count(*) from home';
    db.query(sql2,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        home=results[0];  
    })
    const sql3='select count(*) from agent';
    db.query(sql3,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        agent=results[0];  
    })
    setTimeout(function(){
         res.render("admin/echarts",{project_cate,project,home,agent});
    },500)
    //res.render("admin/echarts");
})

router.get("/bar",(req,res)=>{
    const sql=`select count(*) as count,pc_name from project,project_cate where project.pc_id=project_cate.pc_id group by project.pc_id`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            res.send({
                code:1,
                msg:"查询成功",
                data:results
            })
        }
    })
})

router.get("/barvisit",(req,res)=>{
    const sql='select project_title,num from project where is_delete=0 limit 5';
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            res.send({
                code:1,
                msg:"查询成功",
                data:results
            })
        }
    })
})

module.exports=router;