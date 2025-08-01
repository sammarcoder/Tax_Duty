    // const express = require('express');
    // const router = express.Router();
    // const unitCtrl = require('../controllers/unit.controller');

    // // POST create
    // router.post('/', unitCtrl.createUnit);

    // // GET all
    // router.get('/', unitCtrl.getUnits);

    // // GET one
    // router.get('/:id', unitCtrl.getUnitById);

    // // PATCH update (partial) or PUT (full) — choose one; here PATCH
    // router.put('/:id', unitCtrl.updateUnit);

    // // DELETE
    // router.delete('/:id', unitCtrl.deleteUnit);

    // module.exports = router;












    const express = require('express');
const router = express.Router();
const unitCtrl = require('../controllers/unit.controller');

// POST create
router.post('/', unitCtrl.createUnit);

// GET all
router.get('/', unitCtrl.getUnits);

// GET one
router.get('/:id', unitCtrl.getUnitById);

// PATCH update (partial) or PUT (full) — choose one; here PUT
router.put('/:id', unitCtrl.updateUnit);

// DELETE
router.delete('/:id', unitCtrl.deleteUnit);

module.exports = router;
