/* 
ruta: api/uploads

*/


const expressFileUpload = require('express-fileupload');


const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, fileDownload } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());


router.put('/:tipo/:id', validarJWT, fileUpload )

router.get('/:tipo/:foto', validarJWT, fileDownload )



module.exports = router;