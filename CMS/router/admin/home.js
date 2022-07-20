const express = require('express');
const router = express.Router();
const db = require('../../db/index');
const path = require('path');
const fs = require('fs');
const upload = require('../../lib/upload');

//渲染房源管理页面
router.get('/insert', (req, res) => {
    res.render('admin/homeadd');
});
//图片上传（第二个参数是局部中间件）
router.post('/upload', upload.single('file'), (req, res) => {
    res.send({
        code: 1,
        url: '/uploads/' + req.file.filename,
    });
});
//获取房源管理增加
router.post('/insert', (req, res) => {
    const times = new Date();
    const {
        home_name,
        home_location,
        home_price,
        home_img,
        home_sort,
        home_content,
        kitchen,
        toilet,
        bedchamber,
        Living_room,
        parking_space,
    } = req.body;
    const sql =
        'insert into home(home_name,home_location,home_price,home_img,home_sort,ctime,home_content,kitchen,toilet,bedchamber,Living_room,parking_space) values(?,?,?,?,?,?,?,?,?,?,?,?)';
    db.query(
        sql,
        [
            home_name,
            home_location,
            home_price,
            home_img,
            home_sort,
            times,
            home_content,
            kitchen,
            toilet,
            bedchamber,
            Living_room,
            parking_space,
        ],
        (err, results) => {
            if (err) return res.send({ code: 0, msg: err.message });
            if (results.affectedRow != 1) {
                return res.send({ code: 1, msg: '添加房源成功' });
            } else {
                return res.send({ code: 0, msg: '添加房源失败' });
            }
        }
    );
});

//渲染房源列表页面
router.get('/', (req, res) => {
    res.render('admin/homelist');
});

//查看房源信息(提供给 Layui-table 渲染页面)
router.get('/query', (req, res) => {
    //查询数据
    let isSearch = req.query.search ? req.query.search : '';
    // 每页条数， 当前页数
    const { limit, page } = req.query;

    const offset = (page - 1) * limit;
    let count;
    //查询数据总数
    const sqlstr = `select count(*) as count from home where home_name like'%${isSearch}%'`;
    db.query(sqlstr, (err, results) => {
        if (err) return err;
        count = results[0].count;
    });
    const sql = `select * from home where home_name like'%${isSearch}%' limit ${offset},${limit}`;
    db.query(sql, (err, results) => {
        //sql语句执行失败
        if (err) return res.send({ code: 1, msg: err.message });
        if (results.length) {
            results.forEach((item) => {
                item.ctime = item.ctime.toLocaleString();
            });
            // 此条数据返回给 table-url
            return res.send({
                code: 0,
                msg: '数据查询成功',
                data: results,
                count: count,
            });
        } else {
            return res.send({ code: 1, msg: '数据查询失败' });
        }
    });
});

//查看list
router.get('/list', (req, res) => {
    const sql = `select home.* from home  where home_id=${req.query.id}`;
    db.query(sql, (err, results) => {
        if (err) throw err.message;
        if (results.length != 0) {
            res.render('admin/homeread', { data: results[0] });
        }
    });
});

//单个修改
router.get('/update', (req, res) => {
    const id = req.query.id;
    const sort = req.query.sort ? req.query.sort : '';
    let sql = `update home set home_sort=${sort} where home_id=${id}`;
    db.query(sql, (err, results) => {
        if (err) return res.send({ code: 0, msg: err.message });
        if (results.affectedRows == 1) {
            return res.send({
                code: 1,
                msg: '修改成功',
            });
        } else {
            return res.send({
                code: 0,
                msg: '修改失败',
            });
        }
    });
});

//修改-获取数据：返回 home 对应 id 的整条房源
router.get('/updateAll', (req, res) => {
    const sql = 'select * from home where home_id=?';
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.send({ code: 0, msg: err.message });
        if (results.length !== 0) {
            return res.send({
                code: 1,
                msg: '获取成功',
                data: results[0],
            });
        } else {
            return res.send({
                code: 0,
                msg: '获取失败',
            });
        }
    });
});
// 修改-修改数据：
router.post('/updateAll', (req, res) => {
    const { home_id, home_name, home_location } = req.body;
    const sql = `update home set home_name='${home_name}',home_location='${home_location}' where home_id='${home_id}'`;
    db.query(sql, (err, results) => {
        if (err) return res.send({ code: 0, msg: err.message });
        if ((results.affectedRow = 1)) {
            return res.send({
                code: 1,
                msg: '修改成功',
            });
        } else {
            return res.send({
                code: 0,
                msg: '修改失败',
            });
        }
    });
});

//删除
router.get('/delete', (req, res) => {
    const { id, img } = req.query;
    const sql = 'delete from home where home_id=?';
    db.query(sql, id, (err, results) => {
        if (err) return res.send({ code: 0, msg: err.message });
        // 受影响的行数为 1 时
        if (results.affectedRow == 1) {
            const url = path.join(__dirname, '../../static', img);
            fs.unlink(url, (error) => {
                if (error)
                    return res.send({
                        code: 0,
                        msg: `图片删除失败:${error.message}`,
                    });
            });
            res.send({
                code: 0,
                msg: '图片删除失败',
            });
        } else {
            res.send({
                code: 1,
                msg: '删除成功',
            });
        }
    });
});

module.exports = router;
