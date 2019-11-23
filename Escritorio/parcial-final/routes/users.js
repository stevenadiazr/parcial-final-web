var express = require('express');
var router = express.Router();
var personaje_controller = require('../controllers/personaje_controller')

/* GET users listing. */
router.get('/:nombre', personaje_controller.getOne);
router.get('/', personaje_controller.getAll);

router.post('/',personaje_controller.register);
router.put('/:nombre', personaje_controller.update);
router.delete('/:nombre',personaje_controller.delete);

module.exports = router;
