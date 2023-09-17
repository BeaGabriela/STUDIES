const express = require('express');

const router = express.Router();

const server = require('../controllers/usuarios/server');



// const middle = require('../middleware/middleware');
// 
// router.put('*', middle.validaAcesso)
// router.delete('*', middle.validaAcesso)


router.put('/enviarEmail/:id', server.enviarEmail);
router.put('/emailConfirmado/:id', server.emailConfirmado);
// router.post('enviaremail', email.)
// router.get('/usuario', usuario.read);
// router.get('/usuario/:id', usuario.readOne);
// router.post('/usuario/login', usuario.login);
// router.put('/usuario/:id', usuario.update);
// router.delete('/usuario/:id', usuario.remove);

module.exports = router;