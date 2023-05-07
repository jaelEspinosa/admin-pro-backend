const { response } = require("express");
const bcrypt = require ('bcryptjs');


const Usuario = require('../models/usuarios.js');
const { generarJWT } = require("../helpers/jwt.js");

 


const getUsuarios = async (req, res)=>{

    const desde = Number(req.query.desde) || 0
    const limit = Number(req.query.limit) || 5
   

    try {               
       const [ usuarios, total] = await Promise.all([
                 Usuario
                    .find({}, 'nombre apellidos role google img')
                    .skip( desde )
                    .limit( limit ),
                Usuario.countDocuments()    
        ]);  
            
       
       
        return res.status(200).json({
                ok:true,
                'total-usuarios':total, 
                usuarios,
                uid: req.uid})      
     } catch (error) {
        console.log('hubo un error, consulte los logs');
        return res.status(400).json({ok:false, msg:'hubo un error...consulte logs'})
        
     }

}

const crearUsuario = async (req ,res = response) =>{

    const{ password, email } = req.body;

    const userDB = await Usuario.findOne({email})
   

    if (userDB){
        return res.status(400).json({ok:false, msg:'Este correo ya existe'})
    };

    try {
       const user = new Usuario(req.body)   
       
       //encriptar contraseña
       const salt = bcrypt.genSaltSync();
       user.password = bcrypt.hashSync( password, salt )
       
       await user.save()    

       //generar JWT

       
      
       const token = await generarJWT(user.id)
       return res.json({
            ok:true, 
            user,
            token
     
        })        
     } catch (error) {
       console.log('Hubo un error. consulte los logs'); 
       return res.status(500).json({ok:false, msg: error})
    }   
  
}



const actualizarUsuario = async ( req, res = response ) =>{
     const uid = req.params.id
  
     
     
    try {
        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }

        // actualizar el usuario

        const {password, google, email, ...campos} = req.body   
    
        if( usuarioDB.email !== email){
                    
           const existeEmail = await Usuario.findOne({ email })
           
           if (existeEmail){
               return res.status(400).json({
                   ok:false,
                   msg:'El email ya esta registrado' 
               });              
           };           
        };
          
        


        campos.email=email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new:true} )
        
        res.json({
            ok:true,
            usuario: usuarioActualizado,
            uid: req.uid
        })
        
    } catch (error) {
        console.log('hubo un error, revisar logs.', error);
        return res.status(500).json({
            ok:false,
            msg: 'Error inesperado...'
        })
    }
}



const deleteUsuario = async (req, res = response)=>{

    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete( uid )
        return res.status(200).json({
            ok:true,
            msg: 'Usuario eliminado...'
        
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'hubo un error inesperado, revisar logs...'
        })
        
    }
    

} 







module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario
}