const express = require('express');
const pg = require('pg');
const path = require('path');
const localAuth = require('../public/auth/local');
const params = require('../parameters/logapi');

//User Authentication object
var userObj = null ;
var querys = params.setQuerys();

function getAll(req, res, next){
  const results = [];
  userObj =  localAuth.isAuthenticated(req);
  if(userObj.status==0){
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Select Data
      const query = client.query(querys.getAll);
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json({payload: results});
      });
    });
  }else{
    res.status(401).json({
      status: 'NoAccess',
      message: userObj.message
    });
  }
};

function getById(req, res, next){
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.id;
  userObj =  localAuth.isAuthenticated(req);
  if(userObj.status==0){
    //Build parameter object data
    const objParam = params.buildGetById(req);
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Select Data
      const query = client.query(querys.getById,objParam.params);
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json({payload: results});
      });
    });
  }else{
    res.status(401).json({
      status: 'NoAccess',
      message: userObj.message
    });
  }
}

function add(req, res, next){
  const results = [];
  // Grab data from http request
  userObj =  localAuth.isAuthenticated(req);
  if(userObj.status==0){
    //Build parameter object data
    const objParam = params.buildAdd(req);
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Insert Data
      client.query(querys.add,objParam.params);
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json({payload: results});
      });
    });
  }else{
    res.status(401).json({
      status: 'NoAccess',
      message: userObj.message
    });
  }
}

function update(req, res, next){
  const results = [];

  userObj =  localAuth.isAuthenticated(req);

  if(userObj.status==0){
    //Build parameter object data
    const objParam = params.buildUpdate(req);
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Update Data
      client.query(querys.update,objParam.params)
      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json({payload: results});
      });
    });
  }else{
    res.status(401).json({
      status: 'NoAccess',
      message: userObj.message
    });
  }
}

function remove(req, res, next){
  const results = [];
  // Grab data from the URL parameters
  userObj =  localAuth.isAuthenticated(req);
  
  if(userObj.status==0){
    //Build parameter object data
    const objParam = params.buildRemove(req);
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Delete Data
      client.query(querys.remove, objParam.params);
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json({payload: results});
      });
    });
  }else{
    res.status(401).json({
      status: 'NoAccess',
      message: userObj.message
    });
  }
}

function search(req, res, next){
  const results = [];
  userObj =  localAuth.isAuthenticated(req);
  if(userObj.status==0){
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Select Data
      const query = client.query(querys.getAll);
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        searchResults(req,res,results);
      });
    });
  }else{
    res.status(401).json({
      status: 'NoAccess',
      message: userObj.message
    });
  }
};

function searchResults(req, res, result) {
  
  const queryParams = req.query;

  //console.log('searchResults');

  //Requerid {Some required filter} Field
  //const {filter variable name} = queryParams.{querystring param name}

  //Optional filter, order, paginator fields 
  const filter = queryParams.filter || '',
        sortField = queryParams.sortField,        
        sortOrder = queryParams.sortOrder,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize);

  //console.log(filter);
  
  //Sort direction indicator
  const direction = (sortOrder === 'asc') ? 1: -1;;

  //Filter by required {Some required filter}  field
  //let colResult = Object.values(result).filter(objResult => objResult.{result field name} == {filter variable name});

  //if there's no Filter by required field, then simply initialize colResult
  let colResult = Object.values(result)


  //Choose field ordinator
  if(sortField){
    colResult.sort((l1, l2) => ((l1[sortField] < l2[sortField] ? -1 : 1) * direction)); 
  }

  //Filter results by filter field parameter
  if (filter) {
    colResult = colResult.filter(objResult => Object.values(objResult).join().trim().toLowerCase().search(filter.toLowerCase()) >= 0);
  }

  //Calculates initial position item by page
  const initialPos = pageNumber * pageSize;

  //Cut results to page size
  const resultsPage = colResult.slice(initialPos, initialPos + pageSize);

  //Returns data as Payload(result), found(how many itens were found) and total (How many itens exists)
  setTimeout(() => {
      res.status(200).json({payload: resultsPage, found: resultsPage.length ,total:result.length});
  },1000);
}

module.exports = {
  getAll,
  getById,
  update,
  add,
  remove,
  search
};