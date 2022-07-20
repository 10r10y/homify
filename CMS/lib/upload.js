const multer = require('multer');
const path = require('path');

//文件上传参数设置,文件存储位置
const storage = multer.diskStorage({
    // 配置上传文件位置
    destination: path.join(__dirname, '../static/uploads'),
    // 配置文件名
    filename: function (req, file, cb) {
        var type = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${Date.now().toString()}.${type}`);
    },
});
//文件上传实例
const upload = multer({ storage: storage });

module.exports = upload;
