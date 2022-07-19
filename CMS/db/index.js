const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"lxclcr27",
    database:"home"
});

module.exports=db;
