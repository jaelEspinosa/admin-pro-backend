

/* 

Ruta: /api/medicos

*/

const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { getMedicos, crearMedico, actualizarMedico, deleteMedico } = require('../controllers/medicos.js');



const router = Router();



// hospitales

router.get('/',validarJWT ,getMedicos )

router.post('/',
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
    check('hospital','El id del hospital no es válido').isMongoId(),
    validarCampos
]
, crearMedico);

router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
    check('hospital','El campo hospital es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarMedico)


router.delete('/:id', validarJWT, deleteMedico)


module.exports = router;