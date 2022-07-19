const express=require("express");
const router=express.Router();
const db = require("../../db/index");
const fs=require("fs");
const upload=require("../../lib/upload");

//获取专题管理增加
router.get("/insert",(req,res)=>{
    res.render("admin/specialadd");
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
    const {special_title,special_img,special_content}=req.body;
    const sql='insert into special(special_title,special_img,special_content,ctime) values(?,?,?,?)';
    db.query(sql,[special_title,special_img,special_content,times],(err,results)=>{
           if(err) return res.send({code:0,msg:err.message});
           if(results.affectedRow!=1){
            return res.send({code:1,
              msg:"添加成功"}) ; 
          }else{
              return res.send({code:0,msg:"添加失败"});
          }
    })
})

//获取专题列表
router.get("/",(req,res)=>{
    res.render("admin/speciallist");
})

//渲染页面
router.get("/query",(req,res)=>{
   //查询数据
   let isSearch=req.query.search?req.query.search:"";
   const {limit,page}=req.query;
   const offset=(page-1)*limit;
   var count;
    //查询数据总数
  const sqlstr=`select count(*) as count from special where special_title like'%${isSearch}%'`;
  db.query(sqlstr,(err,results)=>{
      if(err) return err;
      count=results[0].count;
  })
  const sql=`select * from special where special_title like'%${isSearch}%' limit ${offset},${limit}`;
  // const sql='select * from home';
  db.query(sql,(err,results)=>{
       //sql语句执行失败
     if (err) return res.send({code:1,msg:err.message});
     if (results.length){
        results.forEach((item)=>{
            item.ctime=item.ctime.toLocaleString();
        })
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

//是否显示
router.get("/update",(req,res)=>{
    const id=req.query.id;
    const show=req.query.show?req.query.show:"";
    let sql=`update special set is_show=${show} where special_id=${id}`;
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

//删除
router.get("/delete",(req,res)=>{
    const {id,img}=req.query;
    const sql="delete from special where special_id=?"
    db.query(sql,id,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRow==1){
            const url=path.join(__dirname,"../../static",img);
            fs.unlink(url,(error)=>{
                if(error) return res.send({
                    code:0,
                    msg:`图片删除失败:$(error.message)`
                })
            })
            res.send({
                code:0,
                msg:"图片删除失败"
            })
        }else{
            res.send({
                code:1,
                msg:"删除成功"
            })
        }
    })
})

//查看list
router.get("/list",(req,res)=>{
    const sql=`select special.* from special  where special_id=${req.query.id}`;
     db.query(sql,(err,results)=>{
         if(err) throw err.message;
         if(results.length!=0){
             res.render("admin/specialread",{data:results[0]});
         }
     })
 })

 //整体修改-获取数据
router.get("/updateAll",(req,res)=>{
    const sql="select * from special where special_id=?";
    db.query(sql,req.query.id,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!==0){
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
//整体修改-更新数据
router.post("/updateAll",(req,res)=>{
    const {special_id,special_title}=req.body;
   const sql=`update special set special_title='${special_title}' where special_id='${special_id}'`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRow=1){
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