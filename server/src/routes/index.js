const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const taxInfoRoutes = require('./taxInfo.routes')
const UomRoutes = require('./Uom.routes')
const UnitRoutes = require('./unit.routes')
// const fileDetailRoutes = require('./fileDetail.routes');
const fileHeaderRoutes = require('./fileHeader.routes')

router.use('/users', userRoutes);
router.use('/taxInfo', taxInfoRoutes);
router.use('/uom', UomRoutes);
router.use('/unit',UnitRoutes);
// router.use('/file-details', fileDetailRoutes);
router.use('/fileheaders', fileHeaderRoutes);



module.exports = router;
