const multer=require("multer");
const path=require("path");

//文件上传参数设置,文件存储位置
/**/ 
const storage=multer.diskStorage({
    destination:path.join(__dirname,"../static/uploads"),
   filename:function(req,file,cb){
       var type=file.originalname.split(".")[1];
       cb(null,`${file.fieldname}-${Date.now().toString()}.${type}`);
   }
})
//文件上传实例
// const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports=upload;