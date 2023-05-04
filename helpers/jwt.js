

const jwt = require('jsonwebtoken')


const generarJWT = ( uid )=>{

  return new Promise( (resolve, reject) => {

      const payload = {
         uid
      }
     
      jwt.sign( payload, process.env.JWT_SEED, {
         expiresIn: '8h'
      },(err, token)=>{    
         if ( err ) {
             console.log( err );
             reject( 'No se pudo generar JWT' )
         }else{
            resolve( token )
         }    
      });
  });
}






module.exports = { 
    generarJWT
}