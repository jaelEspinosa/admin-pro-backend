const { response } = require("express");
const  Usuario  = require('../models/usuarios.js')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt.js");



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




module.exports = {
                login,
            }