const express=require("express");
const router=express.Router();
const fs=require("fs");
const path=require("path");
const db=require("../../db/index");
const upload=require("../../lib/upload");

//渲染代理人增加
router.get("/insert",(req,res)=>{
    res.render("admin/agentadd");
})

//图片上传
router.post("/upload",upload.single("file"),(req,res)=>{
    //console.log(req.file);
    res.send({
        code:1,
        url:"/uploads/"+req.file.filename
    });
})

//增加
router.post("/inserted",(req,res)=>{
    const times=new Date();
    const {agent_name,agent_time,agent_number,agent_img,agent_content}=req.body;
    //判断重复
    const sql=`select * from agent where agent_name='${agent_name}'`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0) return res.send({code:0,msg:"图片名称重复请重新添加"}); 
        //数据添加
        const sql='insert into agent(agent_name,agent_time,agent_number,agent_img,ctime,agent_content) values(?,?,?,?,?,?)';
        db.query(sql,[agent_name,agent_time,agent_number,agent_img,times,agent_content],(err,results)=>{
            if(err) return res.send({code:0,msg:err.message});
            if(results.affectedRow!=1){
                return res.send({code:1,msg:"添加成功"});
            }else{
                return res.send({code:0,msg:"添加失败"});
            }
        })
    })
})

//获取代理人列表
router.get("/",(req,res)=>{
    res.render("admin/agentlist");
})

//渲染轮播图列表
router.get("/query",(req,res)=>{
    //查询数据
    let isSearch=req.query.search?req.query.search:"";
    const {limit,page}=req.query;
    const offset=(page-1)*limit;
    var count;
     //查询数据总数
   const sqlstr=`select count(*) as count from agent where agent_name like'%${isSearch}%'`;
   db.query(sqlstr,(err,results)=>{
       if(err) return err;
       count=results[0].count;
   })
   const sql=`select * from agent where agent_name like'%${isSearch}%' limit ${offset},${limit}`;
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

  //单个修改
router.get("/update",(req,res)=>{
    const id=req.query.id;
    const time=req.query.time?req.query.time:"";
    const number=req.query.number?req.query.number:"";
    let sql="";
    if(time){
        sql=`update agent set agent_time=${time} where agent_id=${id}`;
    }
    if(number){
         sql=`update agent set agent_number=${number} where agent_id=${id}`;
    }
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
    const sql="delete from agent where agent_id=?"
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

//整体修改-获取数据
router.get("/updateAll",(req,res)=>{
    const sql="select * from agent where agent_id=?";
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
    const {agent_id,agent_name,agent_time}=req.body;
   const sql=`update agent set agent_name='${agent_name}',agent_time='${agent_time}' where agent_id='${agent_id}'`;
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

//查看list
router.get("/list",(req,res)=>{
    const sql=`select agent.* from agent  where agent_id=${req.query.id}`;
     db.query(sql,(err,results)=>{
         if(err) throw err.message;
         if(results.length!=0){
             res.render("admin/agentread",{data:results[0]});
         }
     })
 })

module.exports=router;