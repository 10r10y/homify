const express=require("express");
const router=express.Router();
const db=require("../db/index");

//中间件
router.use((req,res,next)=>{   
    const sqlNav='select nav_url,nav_id,nav_name from nav where is_show=1 order by nav_sort asc';
    db.query(sqlNav,(err,results)=>{
        if(err) return res.send({code:0,msg:err.message});
        if(results.length!=0){
            nav=results;
        }
    })
    setTimeout(function(){
        res.state=nav;
        
    },500)
    next();
})

//解析POST数据
router.use(express.json());
router.use(express.urlencoded({extended:false}));

//首页模块
const indexRouter=require("./index/index");
router.use("/index",indexRouter);

//关于模块
const aboutRouter=require("./index/about");
router.use("/about",aboutRouter);

//专题模块
const listRouter=require("./index/list");
router.use("/list",listRouter);

//代理人模块
const singleRouter=require("./index/single");
router.use("/single",singleRouter);

module.exports=router;