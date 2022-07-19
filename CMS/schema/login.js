//表单验证joi
const joi=require("joi");

const username=joi.string().alphanum().required();
const password=joi.string().pattern(/^[\S]{3,12}$/).required();

exports.login_schema={
    body:{
        username:username,
        password:password
    }
}