const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_account');


router.route('/api/v1/user_account')
            .get(controller.getAll)
            .post(controller.add);

router.route('/api/v1/user_accountsearch')
            .get(controller.search);

router.route('/api/v1/user_account/:id')
            .get(controller.getById)
            .put(controller.update)
            .delete(controller.remove);            

module.exports = router;
