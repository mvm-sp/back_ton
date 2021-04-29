const crypt = require('../crypto').EncryptObj; 

//const express = require('express');

const querys ={
        getAll:'select * from prGetuser_account(null)',
        getById:'select * from prGetuser_account($1)',
        add:'select prPostuser_account($1, $2, $3)',
        update:'select prPutuser_account($1, $2, $3, $4, $5)',
        remove:'select prDeleteuser_account($1)',
        log:'select * from prPostLogApi($1, $2 ,$3, $4)',
        find:'select * from prFinduser_account($1)'
    };


const ret =  {  data : {},
                params:{}
             };

function setQuerys(){
    return querys;
}

function buildGetAll(req){
    return ret;
}

function buildGetById(req){
    ret.data = {id:req.params.id};
    ret.params = objToArray(ret.data);
    return ret;
}

function buildAdd(req){
    ret.data = {name: req.body.name, email: req.body.email, pass: crypt(req.body.pass)}
    ret.params = objToArray(ret.data);
    return ret;
}

function buildUpdate(req){
    ret.data = {id:req.params.id,name: req.body.name, email: req.body.email, pass: req.body.pass, active: req.body.active}
    ret.params = objToArray(ret.data);
    return ret;
}

function buildRemove(req){
    ret.data = {id:req.params.id};
    ret.params = objToArray(ret.data);
    return ret;
}

function buildLog(req, userId){
    ret.data = {apiAddress: req.method + req.url , 
                request: req.body ,
                response: 'response successfully sent', 
                user: userId};
    ret.params = objToArray(ret.data);
    return ret;
}

function buildFind(req){
    ret.data = {email:req.body.email};
    ret.params = objToArray(ret.data);
    return ret;
}

function objToArray(obj){
    var result = [];
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           result.push(obj[key]);
       }
    }
    return result;
}
module.exports = {
    setQuerys,
    buildGetAll,
    buildGetById,
    buildAdd,
    buildUpdate,
    buildRemove,
    buildLog,
    buildFind
};