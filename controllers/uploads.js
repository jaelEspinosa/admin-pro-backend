const { response } = require("express");
const {v4: uuidv4} = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path')
const fs = require('fs')


const fileUpload = async (req, res= response) =>{

    const {tipo, id} = req.params;


    //validar tipo
    const tiposPermitidos = ['hospitales','medicos','usuarios']
      if(!tiposPermitidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un médico, usuario u hospital'
        })
      };

    // validar que existe un archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
        	msg:'No seleccionó ningún archivo.'
        });
    };

    // Procesar la imagen
    const file= req.files.img  
    const extension = file.name.split('.')[file.name.split('.').length-1]

    // validar extension
    const extensionValida = ['png','jpg','jpeg','gif']
    if(!extensionValida.includes(extension)){
        return res.status(400).json({
            ok:false,
        	msg:'Archivo no válido.'
        });
    }
    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extension}`

    // path para Guardar imagen
    const path = `./uploads/${ tipo }/${nombreArchivo}`
   
    // Mover la imagen
    file.mv(path, (err)=>{
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg: 'Error al guardar el archivo'
            })
        }

        //actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo)

        return res.json({
            ok:true,
            msg: 'Archivo guardado.',
            nombreArchivo
        })
    })  

}

const fileDownload = async (req, res = response) =>{
    const {tipo, foto} = req.params;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    
    //imagen por defecto
    if(!fs.existsSync(pathImg)){
        const pathImg = path.join(__dirname, '../uploads/no-img.jpg')
        return res.status(200).sendFile(pathImg)
    };
    return res.status(200).sendFile(pathImg)
}







module.exports={
    fileUpload,
    fileDownload
}