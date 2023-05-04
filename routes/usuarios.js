/* 

Ruta: /api/usuarios

*/

const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, deleteUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



// usuarios

router.get('/',validarJWT, getUsuarios )
router.post('/',
[
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
   check('password','La contraseña es obligatoria').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),
   validarCampos
]
, crearUsuario);

router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarUsuario)


router.delete('/:id', validarJWT, deleteUsuario)













module.exports = router;