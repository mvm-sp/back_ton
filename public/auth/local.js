const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(main) {
  const playload = {
    exp: moment().add(2, 'hours').unix(),
    iat: moment().unix(),
    sub: main
  };
  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {
    try{
        console.log(process.env.TOKEN_SECRET);
        const payload = jwt.decode(token, process.env.TOKEN_SECRET);
        const now = moment().unix();
        //console.log(payload, (now > payload.exp));
        // check if the token has expired
        if (now > payload.exp) callback('Token has expired.');
        else callback(null, payload);
    }catch(err){
        callback('Token error');
    }
  }

  
  function isAuthenticated(req) {
    const objData ={
      status: (process.env.NODE_ENV=='development'? 0 : -1 ),
      message: (process.env.NODE_ENV=='development'? 'Developnent is allowed' : '' ),
      user: (process.env.NODE_ENV=='development'? 'dev@ton' : '' )
    };
    if (!(req.headers && req.headers.authorization) ) {
        if(process.env.NODE_ENV!='development' && false){
            objData.status = -1;
            objData.message = 'Please log in';
        }
    }else{
        // decode the token
        var header = req.headers.authorization.split(' ');
        var token = header[1];
        decodeToken(token, (err, reader) => {
        if (err) {
            objData.status = -1;
            objData.message = err.toString();  
        } else {
            objData.status = 0;
            objData.message = 'User has a valid Token';  
            objData.user = reader.sub;
        }
        });
    }
    return objData;
  }


  function config(){
   return {connectionString: process.env.DATABASE_URL};
  }

  
  module.exports = {
    encodeToken,
    decodeToken,
    isAuthenticated,
    config
  };