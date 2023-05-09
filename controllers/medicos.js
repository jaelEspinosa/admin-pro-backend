
const { response } = require("express");
const Medico = require("../models/medico.js");
const Hospital = require("../models/hospital.js");





const getMedicos = async (req, res=response) =>{
       
    try {
        const medicos = await Medico.find()
                .populate('usuario','nombre img')
                .populate('hospital','nombre img')
        res.status(200).json({
            ok:true,
            medicos
        })
        
    } catch (error) {
        res.status(200).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

};

const crearMedico = async (req, res=response) =>{

  const uid = req.uid;
  const medico = new Medico({
        usuario: uid, 
        ...req.body
    });
  
  try { 
        //validamos que existe este id en hospitales
    const  isValidHospital = await Hospital.findById(medico.hospital);
            if(!isValidHospital) {
                return res.status(404).json({
                    ok:false,
                    msg:'Hospital no encontrado en la DB'
                })
            };
          

    const medicoDB = await medico.save()

    res.status(200).json({
        ok:true,
        medico: medicoDB
    })
    
} catch (error) {
    console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'hable con un administrador.'
        })
}  




};

const actualizarMedico = async (req, res=response) =>{    
    const { id } = req.params
    const uid = req.uid;
try {
    const medicoDB = await Medico.findById( id )

    if(!medicoDB){
        return res.status(404).json({
            true: false,
            msg:'No se encontró el médico'
        })
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(id, {...req.body, usuario: uid},{new:true});
    
    return res.status(200).json({
        ok:true,
        medico: medicoActualizado
    });

} catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'hable con el administrador'
    });
 };
};





const deleteMedico = async (req, res=response) =>{

    const { id } = req.params;

    try {
        const medicoToDelete = await Medico.findById( id )
        
        if (!medicoToDelete){
         return res.status(404).json({
                ok:false,
                msg:'No hemos encontrado ese médico en la base de datos.'
            })
        };

        await medicoToDelete.deleteOne()
        return res.status(200).json({
            ok:true,
            msg:'Borrado con éxito...'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con un administrador'
        })
    }

   
};





module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    deleteMedico
}