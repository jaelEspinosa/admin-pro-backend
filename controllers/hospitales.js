
const { response } = require("express");
const Hospital = require("../models/hospital.js");



const getHospitales = async (req, res=response) =>{
     
    
    try {
        const hospitales = await Hospital.find()
                            .populate('usuario','nombre img')
        res.status(200).json({
            ok:true,
            hospitales
        })
        
    } catch (error) {
        res.status(200).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
};

const crearHospital = async (req, res=response) =>{ 
     const uid = req.uid;
     const hospital = new Hospital({usuario:uid, ...req.body});
    try {      
        
        const hospitalDB = await hospital.save();
        return res.status(200).json( {
            ok:true,
            hospital: hospitalDB
        } );   
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'hable con un administrador.'
        })
    }

    
};

const actualizarHospital = async (req, res=response) =>{
    res.status(200).json({
        ok:true,
        msg:'Actualizando'
    })
};

const deleteHospital = async (req, res=response) =>{
    res.status(200).json({
        ok:true,
        msg:'Borrando...'
    })
};





module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    deleteHospital
}