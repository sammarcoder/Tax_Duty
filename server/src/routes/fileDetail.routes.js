// // fileDetail.routes.js
// const express = require('express');
// const router = express.Router();
// const fileDetailController = require('../controllers/fileDetail.controller');

// // Create a new file detail with tax info records
// router.post('/', fileDetailController.createFileDetail);


// router.get('/', fileDetailController.getAllFileDetails);

// // Get file detail by ID with tax info records
// router.get('/:id', fileDetailController.getFileDetailById);

// router.put('/:id', fileDetailController.updateFileDetail);

// router.delete('/:id', fileDetailController.deleteFileDetail)

// module.exports = router;





























// fileDetail.routes.js
const express = require('express');
const router = express.Router();
const fileDetailController = require('../controllers/fileDetail.controller');

// Add an item to an existing file
router.post('/:id/items', fileDetailController.addItemToFile);

// Update a specific item
router.put('/items/:id', fileDetailController.updateFileItem);

// Delete a specific item
router.delete('/items/:id', fileDetailController.removeItemFromFile);

// Get a specific item by ID
router.get('/items/:id', fileDetailController.getFileDetailById);

// Get all items
router.get('/', fileDetailController.getAllFileDetails);

module.exports = router;
