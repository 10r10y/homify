const express=require("express");
const router=express.Router();
const path=require("path");
const db=require("../../db/index");
const fs=require("fs");
const upload=require("../../lib/upload");
const multer=require("multer");

router.get("/insert",(req,res)=>{
    res.render("admin/banneradd")
})

router.get("/",(req,res)=>{
    res.render("admin/bannerlist");
})

//图片上传
router.post("/upload",upload.single("file"),(req,res)=>{
    //console.log(req.file);
    res.send({
        code:1,
        url:"/uploads/"+req.file.filename
    });
})
//添加
router.post("/inserted",(req,res)=>{
    const {banner_name,banner_sort,banner_img}=req.body;
    //判断重复
    const sql=`select * from banner where banner_name='${banner_name}'`;
    db.query(sql,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0) return res.send({code:0,msg:"图片名称重复请重新添加"}); 
        //数据添加
        const sql='insert into banner(banner_name,banner_sort,banner_img) values(?,?,?)';
        db.query(sql,[banner_name,banner_sort,banner_img],(err,results)=>{
            if(err) return res.send({code:0,msg:err.message});
            if(results.affectedRow!=1){
                return res.send({code:1,msg:"添加成功"});
            }else{
                return res.send({code:0,msg:"添加失败"});
            }
        })
    })
})

//渲染轮播图列表
router.get("/query",(req,res)=>{
  //查询数据
  let isSearch=req.query.search?req.query.search:"";
 const sql=`select * from banner where banner_name like'%${isSearch}%' `;
 db.query(sql,(err,results)=>{
      //sql语句执行失败
    if (err) return res.send({code:1,msg:err.message});
    if (results.length){
     return res.send({
         code:0,
         msg:"数据查询成功",
         data:results
     });
    }else{
     return res.send({code:1,msg:"数据查询失败"});
    }
 })
})

//删除
router.get("/delete",(req,res)=>{
    //console.log(req.query);
    const {id,img}=req.query;
    const sql="delete from banner where banner_id=?"
    db.query(sql,id,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRows==1){
            /* const url=path.join(__dirname,"../../static",img);
            console.log(url);
            fs.unlink(url,(error)=>{
                if(error) return res.send({
                    code:0,
                    msg:`图片删除失败:$(error.message)`
                })
            }) */ 
            res.send({
                code:1,
                msg:"删除成功"
            })
            
        }else{
            res.send({
                code:0,
                msg:"图片删除失败"
            })
        }
    })
})

//修改整体(渲染弹出层)
router.get("/updateAll",(req,res)=>{
   const sql="select * from banner where banner_id=?";
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
    const {banner_id,banner_name,banner_sort,oldbanner_img}=req.body;
    // console.log(req.body);
    if(req.body.banner_img){
    //修改图片
    const sql='update banner set banner_name=?,banner_sort=?,banner_img=? where banner_id=?';
    db.query(sql,[banner_name,banner_sort,banner_id,req.body.banner_img],(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRows!=1){
              //删除图片 
            /**/ 
            const url=path.join(__dirname,'../../static/uploads/',oldbanner_img);
            fs.unlink(url,(error)=>{
                if(error) {
                    return res.send({
                    code:0,
                    msg:`图片删除失败:${error.message}`
                })
            }
            })
             return res.send({code:1,msg:"修改成功"});   
        }else{
            return res.send({ code:0, msg:"修改失败"});
         }
    })
   }else{
    //没有修改图片
    const sql=`update banner set banner_name=?,banner_sort=? where banner_id=?`;
    db.query(sql,[banner_name,banner_sort,banner_id],(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.affectedRows!=1){
            return res.send({code:0,msg:"修改失败"});
        }else{
            
            return res.send({code:1,msg:"修改成功"});
        }
    })
   }
})

//修改排序
router.get("/update",(req,res)=>{
    const id=req.query.id;
    const sort=req.query.sort?req.query.sort:"";
    const sql=`update banner set banner_sort=${sort} where banner_id=${id}`;
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