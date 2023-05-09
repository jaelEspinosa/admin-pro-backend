const { response } = require("express");
const  Usuario  = require('../models/usuarios.js')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt.js");
const { googleVerify } = require("../helpers/google-verify.js");



const login = async (req, res = response) =>{

    const {password, email} = req.body

    try {        
        // comprobar si existe el usuario
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){ 
            return res.status(404).json({
                ok:false,
                msg: 'Usuario o contraseña no válidos'
            });
        };        
        // vericar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if (!validPassword){
            return res.status(404).json({
                ok:false,
                msg: 'Usuario o contraseña no válidos'
            });
        }; 
        const token = await generarJWT( usuarioDB.id );
        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador...'
        })
    }
   
}

const googleSingIn = async (req, res = response) =>{
    
    try   {
            const {email, name, picture} = await googleVerify(req.body.token)

            // Verificar que el usuario existe por email

            const usuarioDB = await Usuario.findOne({ email });
            let usuario;

            if ( !usuarioDB ) {
                usuario = new Usuario({
                    nombre: name,
                    apellidos: name,
                    email,
                    password:'@@@',
                    img: picture, 
                    google: true
                })
            } else {
                usuario = usuarioDB,
                usuario.google = true
            }

            //Guardar usuario
            await usuario.save();
            // Generar el TOKEN - JWT
            const token = await generarJWT( usuario.id)

            res.json({
                ok:true,
                email, name, picture, token
            })
        
    } catch (error) {
            console.log(error);
            return res.status(400).json({
                ok:false,
                msg: 'token de Google no válido'
            });
   };
};


const renewToken = async (req, res=response) => {

    const uid = req.uid
   // generar un nuevo TOKEN - JWT

   const token = await generarJWT( uid )

   return res.status(200).json({
            ok:true,
            token
            })

}


module.exports = {
                login,
                googleSingIn,
                renewToken
            }