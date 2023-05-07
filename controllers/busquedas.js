const { response } = require("express");
const Usuario = require('../models/usuarios');
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");



const busquedaGeneral = async (req, res=response)=>{

    const termino = req.params.termino

    const regex = new RegExp( termino, 'i')

    const[usuarios, medicos, hospitales] = await Promise.all([
        
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre:regex})
    
    ]); 
   
    res.status(200).json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
};



const busquedaPorColeccion = async (req, res=response) =>{
    const termino   = req.params.termino
    const tabla = req.params.tabla
    const regex     = new RegExp( termino, 'i')
    
    let data=[]


    switch (tabla) {
        case 'usuarios':
           data = await Usuario.find({nombre: regex})
           break;

        case 'medicos':
            data = await Medico.find({nombre: regex})
                         .populate('usuario','nombre img')
                         .populate('hospital','nombre imb');
            break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                         .populate('usuario','nombre img');
            break;
        

        default:
            return res.status(400).json({
                ok:false,
                msg: 'Las colecciones son usuarios/medicos/hospitales'
            });            
    }
   
    return res.status(200).json({
        ok:true,
        data
    }) 
   
}




module.exports ={

    busquedaGeneral,
    busquedaPorColeccion

}