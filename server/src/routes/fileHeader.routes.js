// const express = require('express');
// const router = express.Router();
// const fileHeaderController = require('../controllers/fileHeader.controller');

// // Create a new file with multiple items
// router.post('/', fileHeaderController.createFileHeaderWithDetails);

// // Get all files
// router.get('/', fileHeaderController.getAllFileHeaders);

// // Get file by ID with all items
// router.get('/:id', fileHeaderController.getFileHeaderById);

// // Update file header
// router.put('/:id', fileHeaderController.updateFileHeader);

// // Add item to existing file
// router.post('/:id/items', fileHeaderController.addItemToFile);

// // Update item in file
// router.put('/items/:id', fileHeaderController.updateFileItem);

// // Remove item from file
// router.delete('/items/:id', fileHeaderController.removeItemFromFile);

// // Delete file with all its items
// router.delete('/:id', fileHeaderController.deleteFileHeader);

// module.exports = router;
















// routes/fileHeader.routes.js
const express = require('express');
const router = express.Router();
const fileHeaderController = require('../controllers/fileHeader.controller');
const fileDetailController = require('../controllers/fileDetail.controller');

// Create a new file with multiple items
router.post('/', fileHeaderController.createFileHeaderWithDetails);

// Get all files
router.get('/', fileHeaderController.getAllFileHeaders);

// Get file by ID with all items
router.get('/:id', fileHeaderController.getFileHeaderById);

// Update file header
router.put('/:id', fileHeaderController.updateFileHeader);

// Add item to existing file
router.post('/:id/items', fileDetailController.addItemToFile);

// Update item in file
router.put('/items/:id', fileDetailController.updateFileItem);

// Remove item from file
router.delete('/items/:id', fileDetailController.removeItemFromFile);

// Get specific file item
router.get('/items/:id', fileDetailController.getFileDetailById);

// Delete file with all its items
router.delete('/:id', fileHeaderController.deleteFileHeader);

module.exports = router;
