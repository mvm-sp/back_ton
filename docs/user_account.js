/**
 * @apiDefine GenericError
 *
 * @apiError Generic Erro Message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Error
 *     {
 *       "success": false,
 *       "error": "error messagem"
 *     }
 */

/**
 * @api {get} /user_account/ Read all data of a user_account
 * @apiVersion 1.1.0
 * @apiName getAll
 * @apiGroup user_account
 * @apiPermission Token Validation
 *
 * @apiDescription This route reads user_account data
 *
 *
 * @apiExample Example usage:
 * curl https://{HostAddres}/api/v1/user_account/
 *
 * @apiSuccess {int4}     id          Description
 * @apiSuccess {varchar}     name          Description
 * @apiSuccess {varchar}     email          Description
 * @apiSuccess {varchar}     pass          Description
 * @apiSuccess {bool}     active          Description
 * @apiSuccess {timestamptz}     createdat          Description
 * @apiSuccess {timestamptz}     updatedat          Description

 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
       *       "id": "", 
 *       "name": "", 
 *       "email": "", 
 *       "pass": "", 
 *       "active": "", 
 *       "createdat": "", 
 *       "updatedat": "", 
   
 *     }
 *
 * @apiUse GenericError
 * 
 */
function getAll() { return; }

/**
 * @api {get} /user_account/:id Read data of a user_account by id
 * @apiVersion 1.1.0
     
 * @apiPermission Token Validation
 *
 * @apiDescription This route reads user_account data
 *
 * @apiParam {String} id The user_account-ID.
 *
 * @apiExample Example usage:
 * curl https://{HostAddres}/api/v1/user_account/4711
 *
 * @apiSuccess {int4}     id          Description
 * @apiSuccess {varchar}     name          Description
 * @apiSuccess {varchar}     email          Description
 * @apiSuccess {varchar}     pass          Description
 * @apiSuccess {bool}     active          Description
 * @apiSuccess {timestamptz}     createdat          Description
 * @apiSuccess {timestamptz}     updatedat          Description

 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
       *       "id": "", 
 *       "name": "", 
 *       "email": "", 
 *       "pass": "", 
 *       "active": "", 
 *       "createdat": "", 
 *       "updatedat": "", 
   
 *     }
 *
 * @apiUse GenericError
 */
function getById() { return; }

/**
 * @api {get} /user_account/ Search data of a user_account by passed parameters
 * @apiVersion 1.1.0
 * @apiName search
 * @apiGroup user_account
 * @apiPermission Token Validation
 *
 * @apiDescription This route reads user_account data
 *
 *
 * @apiExample Example usage:
 * curl https://{HostAddres}/api/v1/user_accountsearch/?filter={Text to Filter}&sortOrder={asc/desc}&pageNumber={Page Number}&pageSize={Page Size}
 *
 * @apiSuccess {int4}     id          Description
 * @apiSuccess {varchar}     name          Description
 * @apiSuccess {varchar}     email          Description
 * @apiSuccess {varchar}     pass          Description
 * @apiSuccess {bool}     active          Description
 * @apiSuccess {timestamptz}     createdat          Description
 * @apiSuccess {timestamptz}     updatedat          Description

 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
       *       "id": "", 
 *       "name": "", 
 *       "email": "", 
 *       "pass": "", 
 *       "active": "", 
 *       "createdat": "", 
 *       "updatedat": "", 
   
 *     }
 *
 * @apiUse GenericError
 * 
 */
function search() { return; }

/**
 * @api {post} /user_account Create a new user_account record
 * @apiVersion 1.1.0
 * @apiName add
 * @apiGroup user_account
 * @apiPermission Token Validation
 *
 * @apiDescription This Route is used to add new record to the user_account 
 * 
 * @apiParam {varchar}     name          Description
 * @apiParam {varchar}     email          Description
 * @apiParam {varchar}     pass          Description
 * @apiParam {bool}     active          Description

 *
 * @apiExample Example usage:
 * curl https://{HostAddres}/api/v1/user_account/
 *
 * 
 *
 * @apiUse GenericError
 */
function add() { return; }

/**
 * @api {put} /user_account/:id Update the user_account data by Id
 * @apiVersion 1.1.0
 * @apiName update
 * @apiGroup user_account
 * @apiPermission Token Validation
 *
{DOCParamReqPut}
 *
 * @apiDescription This Route is used to update data to the user_account 
 *
 * @apiExample Example usage:
 * curl https://{HostAddres}/api/v1/user_account/
 *
 * 
 *
 * @apiUse GenericError
 */
function update() { return; }


/**
 * @api {delete} /user_account/:id  Delete data of a user_account by ID
 * @apiVersion 1.1.0
 * @apiName remove
 * @apiGroup user_account
 * @apiPermission Token Validation
 *
 * @apiDescription This route remove a record from user_account
 *
 * @apiParam {Number} id The user_account-ID.
 *
 * @apiExample Example usage:
 * curl https://{HostAddres}/api/v1/user_account/
 *
 * 
 *
 * @apiUse GenericError
 */
function remove() { return; }

