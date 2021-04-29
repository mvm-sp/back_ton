const express = require('express');
const router = express.Router();
const controller = require('../controllers/logapi');


router.route('/api/v1/logapi')
            .get(controller.getAll)
            .post(controller.add);

router.route('/api/v1/logapisearch')
            .get(controller.search);

router.route('/api/v1/logapi/:id')
            .get(controller.getById)
            .put(controller.update)
            .delete(controller.remove);            

module.exports = router;
