// const express = require('express');
// const router = express.Router();
// const taxInfoController = require('../controllers/taxInfo.controller');

// // Route for creating a new record (POST)
// router.post('/', taxInfoController.createTaxInfo);

// // Route for getting all records (GET)
// router.get('/', taxInfoController.getAllTaxInfo);

// // Route for getting a single record by ID (GET)
// router.get('/:id', taxInfoController.getTaxInfoById);

// // Route for updating a record by ID (PUT)
// router.put('/:id', taxInfoController.updateTaxInfo);

// // Route for deleting a record by ID (DELETE)
// router.delete('/:id', taxInfoController.deleteTaxInfo);

// module.exports = router;































const express = require('express');
const router = express.Router();
const taxInfoController = require('../controllers/taxInfo.controller');

// Route for creating a new record (POST)
router.post('/', taxInfoController.createTaxInfo);

// Route for getting all records (GET)
router.get('/', taxInfoController.getAllTaxInfo);

// Route for getting a single record by ID (GET)
router.get('/:id', taxInfoController.getTaxInfoById);

// Route for updating a record by ID (PUT)
router.put('/:id', taxInfoController.updateTaxInfo);

// Route for deleting a record by ID (DELETE)
router.delete('/:id', taxInfoController.deleteTaxInfo);

module.exports = router;
