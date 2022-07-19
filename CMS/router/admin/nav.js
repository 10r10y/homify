const express=require("express");
const router=express.Router();
const db=require("../../db/index");

//引入数据验证规则
//const nav_schema =require("../../schema/navadd");
//const expressJoi=require("@escook/express-joi");

//渲染添加导航  /insert
router.get("/insert",(req,res)=>{
    res.render("admin/navadd");
})
//数据添加
router.post("/insert",(req,res)=>{
    const {nav_name,nav_alias,nav_sort,nav_url}=req.body;
    /*//查重
    const sql="select nav_name,nav_alias,nav_sort from nav"
       db.query(sql,[nav_name,nav_alias],(err,results)=>{
        console.log(results);
         if(err) return res.send({code:0,msg:err.message});
        if(results.length==1 && results[0].nav_name==nav_name && results[0].nav_alias==nav_alias){
            return res.send({code:0,msg:"导航名称与别名重复，请重新输入"});
         }
        if(results.length==2){
             return res.send({code:0,msg:"导航名称与别名都重复，请重新输入"});
        }
        if(results.length==1 && results[0].name_alias==nav_alias){
             return res.send({code:0,msg:"导航别名都重复，请重新输入"});
        }
        if(results.length==1&&results[0].nav_name==nav_name){
             return res.send({code:0,msg:"导航名称重复，请重新输入"});
        }  })*/      

       //插入数据
       const sql = 'insert into nav(nav_name,nav_alias,nav_sort,nav_url) values(?,?,?,?)';
        db.query(sql,[nav_name,nav_alias,nav_sort,nav_url],(err,results)=>{
            if(err) return res.send({code:0,msg:err.message});
            if(results.affectedRow!=1){
                return res.send({code:1,msg:"导航添加成功"});
            }else{
                return res.send({code:0,msg:"导航添加失败"});
            }
        })
         //插入数据2
        /* var str='insert into nav(';
        for (var i in req.body){
            str=str+i+",";
        }
       str= str.slice(0,-1)+") values(";
       for(var i in req.body){
        str=str+`'${req.body}[i]',`;
       }
       str=str.slice(0,-1)+")";
       db.query(str,[nav_name,nav_alias,nav_sort],(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRow!=1){
            return res.send({code:1,msg:"导航添加成功"});
        }else{
            return res.send({code:0,msg:"导航添加失败"});
        }
    })*/         
})

//渲染查看导航模板
router.get("/",(req,res)=>{
    res.render("admin/navlist");
})

//查看导航页面数据
router.get("/query",(req,res)=>{
     //查询数据
    let isSearch=req.query.search?req.query.search:"";
    const {limit,page}=req.query;
    const offset=(page-1)*limit;
    var count;
    //查询数据总数
    const sqlstr=`select count(*) as count from nav where nav_name like'%${isSearch}%'`;
    db.query(sqlstr,(err,results)=>{
        if(err) return err;
        count=results[0].count;
    })
     const sql=`select * from nav where nav_name like'%${isSearch}%' limit ${offset},${limit}`;
    //const sql=`select * from nav limit ${offset},${limit}`;
     db.query(sql,(err,results)=>{
        //sql语句执行失败
       if (err) return res.send({code:1,msg:err.message});
       if (results.length){
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

//修改数据
router.get("/update",(req,res)=>{
    const id=req.query.id;
    const show=req.query.show?req.query.show:"";
    const sort=req.query.sort?req.query.sort:"";
    let sql="";
    if(show){
        sql=`update nav set is_show=${show} where nav_id=${id}`;
    }
    if(sort){
         sql=`update nav set nav_sort=${sort} where nav_id=${id}`;
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
   //const sql=`update nav set is_show=${show} where nav_id=${id}`; 
})

//删除数据
router.get("/delete",(req,res)=>{
    const sql='delete from nav where nav_id=?';
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

//整体修改-获取数据
router.get("/updateAll",(req,res)=>{
    const sql="select * from nav where nav_id=?";
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
    const {nav_id,nav_name,nav_alias}=req.body;
   const sql=`update nav set nav_name='${nav_name}',nav_alias='${nav_alias}' where nav_id='${nav_id}'`;
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