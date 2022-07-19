const express=require("express");
const db = require("../../db/index");
const router=express.Router();
const fs=require("fs");
const upload=require("../../lib/upload");

router.get("/insert",(req,res)=>{
        const sql='select * from project_cate where is_delete=0';
        db.query(sql,(err,results)=>{
            if(err) throw err.message;
            res.render("admin/projectadd",{category:results});
        })
})

//图片上传
router.post("/upload",upload.single("file"),(req,res)=>{
        res.send({
            code:1,
            url:"/uploads/"+req.file.filename
        })
})

//项目增加功能
router.post("/insert",(req,res)=>{
    const times=new Date();
    const {project_title,project_thumb,project_banner,pc_id,project_content,p_kitchen,p_toilet,p_bedchamber,p_Livingroom,p_parkingspace,project_price,project_location,num}=req.body;
    const sql='insert into project(project_title,project_thumb,project_banner,pc_id,project_content,ctime,p_kitchen,p_toilet,p_bedchamber,p_Livingroom,p_parkingspace,project_price,project_location,num) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    db.query(sql,[project_title,project_thumb,project_banner,pc_id,project_content,times,p_kitchen,p_toilet,p_bedchamber,p_Livingroom,p_parkingspace,project_price,project_location,num],(err,results)=>{
           if(err) return res.send({code:0,msg:err.message});
           if(results.affectedRow!=1){
            return res.send({code:1,
              msg:"添加成功"}) ; 
          }else{
              return res.send({code:0,msg:"添加失败"});
          }
    })
})

router.get("/",(req,res)=>{
        res.render("admin/projectlist");
})

//渲染页面
router.get("/query",(req,res)=>{
    //查询数据
    let isSearch=req.query.search?req.query.search:"";
    const {limit,page}=req.query;
    const offset=(page-1)*limit;
    var count;
     //查询数据总数
   const sqlstr=`select count(*) as count from project where project_title like'%${isSearch}%'`;
   db.query(sqlstr,(err,results)=>{
       if(err) return err;
       count=results[0].count;
   })
   const sql2=`select project_id,project_title,project_thumb,project.is_delete,pc_name,ctime,project_location from project,project_cate where project.pc_id=project_cate.pc_id limit ${offset},${limit}`;
   db.query(sql2,(err,results)=>{
    //sql语句执行失败
  if (err) return err;
  if (results.length){
    results.forEach((item)=>{
        item.ctime=item.ctime.toLocaleString();
    })
   return res.send({
       code:0,
       msg:"渲染成功",
       data:results,
       count:count
   });
  }else{
   return res.send({code:1,msg:"渲染失败"});
  }
})
})
//查询
router.get("/select",(req,res)=>{
    const isSearch=req.query.search?req.query.search:"";
    const {limit,page}=req.query;
    const offset=(page-1)*limit;
    var count;
     //查询数据总数
   const sqlstr=`select count(*) as count from project where project_title like'%${isSearch}%'`;
   db.query(sqlstr,(err,results)=>{
       if(err) return err;
       count=results[0].count;
   })
    const sql=`select project_id,project_title,project_thumb,project.is_delete,pc_name,ctime,project_location from project,project_cate where project.pc_id=project_cate.pc_id and project_title like'%${isSearch}%' limit ${offset},${limit}`;
   db.query(sql,(err,results)=>{
        //sql语句执行失败
      if (err) return res.send({code:0,msg:err.message});
      if (results.length){
        // results.forEach((item)=>{
        //     item.ctime=item.ctime.toLocalString();
        // })
       return res.send({
           code:0,
           msg:"数据查询成功",
           data:results,
           count:count
       });
      }else{
       return res.send({code:1,msg:"数据查询失败"});
      }
   })
})
  
 //查看list
router.get("/list",(req,res)=>{
   const sql=`select project.*,project_cate.pc_name from project,project_cate where project.pc_id=project_cate.pc_id and project_id=${req.query.id}`;
    db.query(sql,(err,results)=>{
        if(err) throw err.message;
        if(results.length!=0){
            res.render("admin/projectread",{data:results[0]});
        }
    })
})

//修改edit
router.get("/updateAll",(req,res)=>{
    const sql="select project.*,project_cate.pc_name from project,project_cate where project.pc_id=project_cate.pc_id and project_id=?";
   db.query(sql,req.query.id,(err,results)=>{
    if(err) return res.send({code:0,msg:err.message});
    if(results.length!=0){
        return res.send({
            code:1,
            msg:"获取成功",
            data:results[0]
    })
    }else{
        return res.send({
             code:0,
             msg:"获取失败"
        })
    }    
   })
})
router.post("/updateAll",(req,res)=>{
    const {project_id,project_title,pc_id}=req.body;
   const sql=`update project set project_title='${project_title}'where project_id='${project_id}'`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRows==1){
            return res.send({
                code:1,
                msg:"修改成功"
            })
        }else{
                return res.send({
                    code:0,
                    msg:"修改失败"
                })
            }
    })
})

//删除操作（硬删除）
router.get("/delete",(req,res)=>{
    const sql='delete from project where project_id=?';
    db.query(sql,req.query.id,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRows==1){
            return res.send({
            code:1,
            msg:"删除成功"
        })
        }else{
            return res.send({
                code:0,
                msg:"删除失败"
            })
        }    
    })
})

//删除操作（是否删除-软删除）
router.get("/update",(req,res)=>{
    const id=req.query.id;
    const del=req.query.del?req.query.del:"";
    let sql=`update project set is_delete=${del} where project_id=${id}`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRows==1){
            return res.send({
            code:1,
            msg:"修改成功"
        })
        }else{
            return res.send({
                code:0,
                msg:"修改失败"
            })
        }
        })
})

module.exports=router;