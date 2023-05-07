

/* 
ruta: api/todo/

*/


const { Router } = require('express');
const { busquedaGeneral, busquedaPorColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:termino', validarJWT ,busquedaGeneral )

router.get('/coleccion/:tabla/:termino', validarJWT , busquedaPorColeccion )



module.exports = router;