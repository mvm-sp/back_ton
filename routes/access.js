const express = require('express');
const router = express.Router();
const controller = require('../controllers/access');


router.route('/api/v1/access')
            .get(controller.getAll) 

 
router.route('/api/v1/addaccess')
            .get(controller.add)           

module.exports = router;