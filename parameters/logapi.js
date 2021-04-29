const express = require('express');

const querys ={
        getAll:'select * from prGetlogapi(null)',
        getById:'select * from prGetlogapi($1)',
        add:'select prPostlogapi($1, $2)',
        update:'select prPutlogapi($1, $2, $3, $4)',
        remove:'select prDeletelogapi($1)',
        log:'select * from prPostLogApi($1, $2 ,$3, $4)'
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
    ret.data = {dsurl: req.body.dsurl, dsrequest: req.body.dsrequest, dsresponse: req.body.dsresponse, dsemailuser: req.body.dsemailuser}
    ret.params = objToArray(ret.data);
    return ret;
}

function buildUpdate(req){
    ret.data = {id:req.params.id,dsurl: req.body.dsurl, dsrequest: req.body.dsrequest, dsresponse: req.body.dsresponse, dsemailuser: req.body.dsemailuser}
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
    buildLog
};