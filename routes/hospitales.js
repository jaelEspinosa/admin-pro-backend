

/* 

Ruta: /api/hospitales

*/




const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { getHospitales, crearHospital, actualizarHospital, deleteHospital } = require('../controllers/hospitales.js');


const router = Router();



// hospitales

router.get('/',validarJWT, getHospitales )
router.post('/',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, crearHospital);

router.put('/:id',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarHospital)


router.delete('/:id',validarJWT ,deleteHospital)













module.exports = router;