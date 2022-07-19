const joi=require("joi");

const nav_name=joi.string().require();
const nav_alias=joi.string().require();
const nav_sort=joi.number().require();

exports.nav_schema={
    body:{
        nav_name:nav_name,
        nav_alias:nav_alias,
        nav_sort:nav_sort
    }
}