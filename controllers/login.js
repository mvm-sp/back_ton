const express = require('express');
const pg = require('pg');
const path = require('path');
const localAuth = require('../public/auth/local');


function login(req, res, next){
    const results = [];
    // Grab data from http request
    const data = {email : req.body.email,
                  password : req.body.password};
    // Get a Postgres client from the connection pool
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Select Data
      const query = client.query('select * from prLoginUser($1, $2 )',[data.email,data.password]);
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        console.log(results[0].code);
        if(results[0].code==0){
          res.status(200).json({
            status: 'success',
            message: results[0].message, 
            token: localAuth.encodeToken(data.email)
          });
        }else{
          res.status(401).json({
            status: 'NoAccess',
            message: results[0].message, 
            token: ''
          });
        }
        return res;
      });
    });
}

module.exports = {
    login
  };