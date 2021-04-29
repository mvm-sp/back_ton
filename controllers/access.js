const request = require('request');
/*
{
    "namespace": "com.mvm",
    "key": "d52dc593-fc32-4f6d-bc63-403194db39e1",
    "value": 0
}
*/

function getAll(req, res, next){
      
        request.get("https://api.countapi.xyz/get/com.mvm/d52dc593-fc32-4f6d-bc63-403194db39e1", (err, response, body) => {
        if (err) {
            res.status(500).json({
                status: 'FATAL',
                message: err.message
              });  
          console.log(err);
        } else if (response.statusCode === 200) {
           return res.json({payload: JSON.parse(body)});
        } else {
            res.status(400).json({
                status: 'BAD REQUEST',
                message: err.message
              });  
        }
      });
      
      
};

function add(req, res, next){
      
  request.get("https://api.countapi.xyz/hit/com.mvm/d52dc593-fc32-4f6d-bc63-403194db39e1", (err, response, body) => {
  if (err) {
      res.status(500).json({
          status: 'FATAL',
          message: err.message
        });  
    console.log(err);
  } else if (response.statusCode === 200) {
     return res.json({payload: JSON.parse(body)});
  } else {
      res.status(400).json({
          status: 'BAD REQUEST',
          message: err.message
        });  
  }
});


};

module.exports = {
    getAll,
    add
  };