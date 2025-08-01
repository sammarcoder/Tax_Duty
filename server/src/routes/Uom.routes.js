// const express = require('express');
// const router = express.Router();
// const {
//     createUOM,
//     getUOM,
//     updateUOM,
//     deleteUOM
// } = require('../controllers/Uom.controller'); // Adjust path to your controller file

// // POST: Create a new UOM record
// router.post('/', createUOM);

// // GET: Retrieve UOM records (all or by ID)
// router.get('/:id?', getUOM); // Optional :id param for single record

// // PUT: Update a UOM record by ID
// router.put('/:id', updateUOM);

// // DELETE: Delete a UOM record by ID
// router.delete('/:id', deleteUOM);

// module.exports = router;


































const express = require('express');
const router = express.Router();
const {
   
    getUOM,
    createUOM
} = require('../controllers/Uom.controller'); // Adjust path to your controller file

// POST: Create a new UOM record
// router.post('/', createUOM);

// GET: Retrieve UOM records (all or by ID)
router.post('/', createUOM); // Optional :id param for single record

// PUT: Update a UOM record by ID
// router.put('/:id', updateUOM);

// DELETE: Delete a UOM record by ID
// router.delete('/:id', deleteUOM);

module.exports = router;
