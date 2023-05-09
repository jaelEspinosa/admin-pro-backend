
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

    const id = req.params.id;
    uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        if (!hospital) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        };

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true})


        return res.status(200).json({
            ok:true,
            hospitalActualizado
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    };
};

const deleteHospital = async (req, res=response) =>{
    
    const id = req.params.id

    try {

        const hospital = await Hospital.findById( id )

        if(!hospital){
            res.status(500).json({
                ok:false,
                msg:'No se encuentra el hospital'
            })
        }
    
        await Hospital.findByIdAndDelete( id );

        return res.status(200).json({
            ok:true,
            msg:'Hospital borrado'
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }
};





module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    deleteHospital
}