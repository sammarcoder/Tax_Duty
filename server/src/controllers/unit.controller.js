

// controllers/unit.controller.js

// const { UniqueConstraintError, ValidationError, Op } = require('sequelize');
// const Unit = require('../models/unit.model');
// const TaxInfo = require('../models/taxInfo.model');

// /**
//  * Helper function to re-sequence only the serial numbers of all units.
//  * This preserves the uomCode of each record.
//  */
// const resequenceSerialNumbers = async (transaction) => {
//   // Get all units ordered by current serialNumber
//   const units = await Unit.findAll({
//     order: [['serialNumber', 'ASC']],
//     transaction,
//   });

//   // Update only the serialNumber to be consecutive (1, 2, 3...)
//   for (let i = 0; i < units.length; i++) {
//     const newSerialNumber = i + 1;
//     if (units[i].serialNumber !== newSerialNumber) {
//       units[i].serialNumber = newSerialNumber;
//       // DO NOT modify the uomCode here - it stays as is
//       await units[i].save({ transaction });
//     }
//   }
// };

// /** Create Unit */
// exports.createUnit = async (req, res) => {
//   try {
//     const { unit, uomCode } = req.body;
//     const newUnit = await Unit.create({ unit, uomCode });
//     return res.status(201).json(newUnit);
//   } catch (err) {
//     if (err instanceof UniqueConstraintError) {
//       return res.status(409).json({
//         error: 'Duplicate value. Unit, uomCode, or serialNumber already exists',
//         details: err.errors.map((e) => ({ path: e.path, value: e.value })),
//       });
//     }
//     if (err instanceof ValidationError) {
//       return res.status(400).json({
//         error: 'Validation error',
//         details: err.errors.map((e) => ({ path: e.path, message: e.message })),
//       });
//     }
//     console.error('createUnit error:', err);
//     return res.status(500).json({ error: 'Server error', message: err.message });
//   }
// };

// /** Get All Units */
// exports.getUnits = async (_req, res) => {
//   try {
//     const units = await Unit.findAll({ order: [['serialNumber', 'ASC']] });
//     return res.status(200).json(units);
//   } catch (err) {
//     console.error('getUnits error:', err);
//     return res.status(500).json({ error: 'Server error', message: err.message });
//   }
// };

// /** Get One Unit by ID */
// exports.getUnitById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const unit = await Unit.findByPk(id);
//     if (!unit) return res.status(404).json({ error: 'This unit is not present' });
//     return res.status(200).json(unit);
//   } catch (err) {
//     console.error('getUnitById error:', err);
//     return res.status(500).json({ error: 'Server error', message: err.message });
//   }
// };

// /** Update Unit */
// // exports.updateUnit = async (req, res) => {
// //   const transaction = await Unit.sequelize.transaction();
  
// //   try {
// //     const { id } = req.params;
// //     const { unit, uomCode, serialNumber } = req.body;

// //     // Find the record within the transaction
// //     const record = await Unit.findByPk(id, { transaction });
// //     if (!record) {
// //       await transaction.rollback();
// //       return res.status(404).json({ error: 'The unit is not present' });
// //     }

// //     let serialNumberChanged = false;

// //     // Update unit name if provided
// //     if (unit !== undefined) {
// //       if (!unit.trim()) {
// //         await transaction.rollback();
// //         return res.status(400).json({ error: 'Unit name cannot be empty' });
// //       }
// //       record.unit = unit.trim();
// //     }

// //     // Update serialNumber if provided
// //     if (serialNumber !== undefined) {
// //       const parsedSerialNumber = parseInt(serialNumber, 10);
// //       if (isNaN(parsedSerialNumber) || parsedSerialNumber <= 0) {
// //         await transaction.rollback();
// //         return res.status(400).json({ error: 'serialNumber must be a positive integer' });
// //       }
      
// //       // Check for duplicate serialNumber
// //       if (parsedSerialNumber !== record.serialNumber) {
// //         const existingSerial = await Unit.findOne({
// //           where: { serialNumber: parsedSerialNumber, id: { [Op.ne]: id } },
// //           transaction,
// //         });
        
// //         if (existingSerial) {
// //           await transaction.rollback();
// //           return res.status(409).json({
// //             error: 'Duplicate serialNumber',
// //             details: [{ path: 'serialNumber', value: parsedSerialNumber }],
// //           });
// //         }
        
// //         record.serialNumber = parsedSerialNumber;
// //         serialNumberChanged = true;
// //       }
// //     }

// //     // Update uomCode if provided
// //     if (uomCode !== undefined && uomCode !== record.uomCode) {
// //       if (!uomCode || !/^U_\d{4}$/.test(uomCode)) {
// //         await transaction.rollback();
// //         return res.status(400).json({ error: 'uomCode must be in format U_XXXX (e.g., U_0001)' });
// //       }
      
// //       // Check for duplicate uomCode
// //       const existingUomCode = await Unit.findOne({
// //         where: { uomCode, id: { [Op.ne]: id } },
// //         transaction,
// //       });
      
// //       if (existingUomCode) {
// //         await transaction.rollback();
// //         return res.status(409).json({
// //           error: 'Duplicate uomCode',
// //           details: [{ path: 'uomCode', value: uomCode }],
// //         });
// //       }
      
// //       record.uomCode = uomCode;
// //     }

// //     // Save the updated record
// //     await record.save({ transaction });

// //     // If serialNumber changed, re-sequence all serial numbers
// //     if (serialNumberChanged) {
// //       await resequenceSerialNumbers(transaction);
// //     }

// //     // Commit the transaction
// //     await transaction.commit();

// //     // Get all units for return to frontend
// //     const allUnits = await Unit.findAll({ order: [['serialNumber', 'ASC']] });
    
// //     return res.status(200).json({
// //       updatedRecord: await Unit.findByPk(id),
// //       allUnits: allUnits
// //     });
    
// //   } catch (err) {
// //     // Rollback transaction on error
// //     await transaction.rollback();
    
// //     if (err instanceof UniqueConstraintError) {
// //       return res.status(409).json({
// //         error: 'Duplicate value. Unit, uomCode, or serialNumber already exists',
// //         details: err.errors.map((e) => ({ path: e.path, value: e.value })),
// //       });
// //     }
// //     if (err instanceof ValidationError) {
// //       return res.status(400).json({
// //         error: 'Validation error',
// //         details: err.errors.map((e) => ({ path: e.path, message: e.message })),
// //       });
// //     }
// //     console.error('updateUnit error:', err);
// //     return res.status(500).json({ error: 'Server error', message: err.message });
// //   }
// // };








// exports.updateUnit = async (req, res) => {
//   const transaction = await Unit.sequelize.transaction();
  
//   try {
//     const { id } = req.params;
//     const { unit, uomCode, serialNumber } = req.body;

//     // Return an error if attempting to update unit name
//     if (unit !== undefined) {
//       await transaction.rollback();
//       return res.status(400).json({ error: 'Updating unit name is not allowed' });
//     }

//     // Find the record within the transaction
//     const record = await Unit.findByPk(id, { transaction });
//     if (!record) {
//       await transaction.rollback();
//       return res.status(404).json({ error: 'The unit is not present' });
//     }

//     let serialNumberChanged = false;

//     // Update serialNumber if provided
//     if (serialNumber !== undefined) {
//       const parsedSerialNumber = parseInt(serialNumber, 10);
//       if (isNaN(parsedSerialNumber) || parsedSerialNumber <= 0) {
//         await transaction.rollback();
//         return res.status(400).json({ error: 'serialNumber must be a positive integer' });
//       }
      
//       // Check for duplicate serialNumber
//       if (parsedSerialNumber !== record.serialNumber) {
//         const existingSerial = await Unit.findOne({
//           where: { serialNumber: parsedSerialNumber, id: { [Op.ne]: id } },
//           transaction,
//         });
        
//         if (existingSerial) {
//           await transaction.rollback();
//           return res.status(409).json({
//             error: 'Duplicate serialNumber',
//             details: [{ path: 'serialNumber', value: parsedSerialNumber }],
//           });
//         }
        
//         record.serialNumber = parsedSerialNumber;
//         serialNumberChanged = true;
//       }
//     }

//     // Update uomCode if provided
//     if (uomCode !== undefined && uomCode !== record.uomCode) {
//       if (!uomCode || !/^U_\d{4}$/.test(uomCode)) {
//         await transaction.rollback();
//         return res.status(400).json({ error: 'uomCode must be in format U_XXXX (e.g., U_0001)' });
//       }
      
//       // Check for duplicate uomCode
//       const existingUomCode = await Unit.findOne({
//         where: { uomCode, id: { [Op.ne]: id } },
//         transaction,
//       });
      
//       if (existingUomCode) {
//         await transaction.rollback();
//         return res.status(409).json({
//           error: 'Duplicate uomCode',
//           details: [{ path: 'uomCode', value: uomCode }],
//         });
//       }
      
//       record.uomCode = uomCode;
//     }

//     // Save the updated record
//     await record.save({ transaction });

//     // If serialNumber changed, re-sequence all serial numbers
//     if (serialNumberChanged) {
//       await resequenceSerialNumbers(transaction);
//     }

//     // Commit the transaction
//     await transaction.commit();

//     // Get all units for return to frontend
//     const allUnits = await Unit.findAll({ order: [['serialNumber', 'ASC']] });
    
//     return res.status(200).json({
//       updatedRecord: await Unit.findByPk(id),
//       allUnits: allUnits
//     });
    
//   } catch (err) {
//     // Rollback transaction on error
//     await transaction.rollback();
    
//     if (err instanceof UniqueConstraintError) {
//       return res.status(409).json({
//         error: 'Duplicate value. UomCode or serialNumber already exists',
//         details: err.errors.map((e) => ({ path: e.path, value: e.value })),
//       });
//     }
//     if (err instanceof ValidationError) {
//       return res.status(400).json({
//         error: 'Validation error',
//         details: err.errors.map((e) => ({ path: e.path, message: e.message })),
//       });
//     }
//     console.error('updateUnit error:', err);
//     return res.status(500).json({ error: 'Server error', message: err.message });
//   }
// };





















// exports.updateUnit = async (req, res) => {
//   const transaction = await Unit.sequelize.transaction();

//   try {
//     const { id } = req.params;
//     const { unit, uomCode, serialNumber } = req.body;

//     // ❌ Reject uomCode and serialNumber updates
//     if (uomCode !== undefined || serialNumber !== undefined) {
//       await transaction.rollback();
//       return res.status(400).json({ error: 'Only unit name can be updated' });
//     }

//     const record = await Unit.findByPk(id, { transaction });

//     if (!record) {
//       await transaction.rollback();
//       return res.status(404).json({ error: 'The unit is not present' });
//     }

//     if (unit === undefined || !unit.trim()) {
//       await transaction.rollback();
//       return res.status(400).json({ error: 'Unit name is required' });
//     }

//     record.unit = unit.trim();

//     await record.save({ transaction });
//     await transaction.commit();

//     const allUnits = await Unit.findAll({ order: [['serialNumber', 'ASC']] });

//     return res.status(200).json({
//       updatedRecord: await Unit.findByPk(id),
//       allUnits: allUnits,
//     });

//   } catch (err) {
//     await transaction.rollback();

//     if (err instanceof UniqueConstraintError) {
//       return res.status(409).json({
//         error: 'Duplicate value.',
//         details: err.errors.map((e) => ({ path: e.path, value: e.value })),
//       });
//     }

//     if (err instanceof ValidationError) {
//       return res.status(400).json({
//         error: 'Validation error',
//         details: err.errors.map((e) => ({ path: e.path, message: e.message })),
//       });
//     }

//     console.error('updateUnit error:', err);
//     return res.status(500).json({ error: 'Server error', message: err.message });
//   }
// };












// /** Delete Unit */
// exports.deleteUnit = async (req, res) => {
//   const transaction = await Unit.sequelize.transaction();
  
//   try {
//     const { id } = req.params;
    
//     // Find the unit to delete
//     const unit = await Unit.findByPk(id, { transaction });
//     if (!unit) {
//       await transaction.rollback();
//       return res.status(404).json({ error: 'Record not found' });
//     }

//     // Check if uomCode is used in TaxInfo
//     const taxInfoUsage = await TaxInfo.findOne({ 
//       where: { uomCode: unit.uomCode },
//       transaction,
//     });

//     if (taxInfoUsage) {
//       await transaction.rollback();
//       return res.status(400).json({ 
//         error: 'Cannot delete unit as it is referenced in tax information records' 
//       });
//     }

//     // Delete the unit
//     await unit.destroy({ transaction });

//     // Re-sequence ONLY serial numbers, NOT uomCodes
//     await resequenceSerialNumbers(transaction);

//     // Commit the transaction
//     await transaction.commit();

//     return res.status(200).json({ message: 'Record deleted successfully' });
    
//   } catch (err) {
//     // Rollback transaction on error
//     await transaction.rollback();
    
//     console.error('deleteUnit error:', err);
//     return res.status(500).json({ error: 'Server error', message: err.message });
//   }
// };











































































const { UniqueConstraintError, ValidationError, Op } = require('sequelize');
const Unit = require('../models/unit.model');
const TaxInfo = require('../models/taxInfo.model');

const resequenceSerialNumbers = async (transaction) => {
  const units = await Unit.findAll({ order: [['serialNumber', 'ASC']], transaction });
  for (let i = 0; i < units.length; i++) {
    const newSerialNumber = i + 1;
    if (units[i].serialNumber !== newSerialNumber) {
      units[i].serialNumber = newSerialNumber;
      await units[i].save({ transaction });
    }
  }
};

exports.createUnit = async (req, res) => {
  try {
    const { unit, uomCode } = req.body;
    const newUnit = await Unit.create({ unit, uomCode });
    return res.status(201).json(newUnit);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ error: 'Duplicate value. Unit, uomCode, or serialNumber already exists', details: err.errors.map(e => ({ path: e.path, value: e.value })) });
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors.map(e => ({ path: e.path, message: e.message })) });
    }
    console.error('createUnit error:', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
};

exports.getUnits = async (_req, res) => {
  try {
    const units = await Unit.findAll({ order: [['serialNumber', 'ASC']] });
    return res.status(200).json(units);
  } catch (err) {
    console.error('getUnits error:', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await Unit.findByPk(id);
    if (!unit) return res.status(404).json({ error: 'This unit is not present' });
    return res.status(200).json(unit);
  } catch (err) {
    console.error('getUnitById error:', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
};

exports.updateUnit = async (req, res) => {
  const transaction = await Unit.sequelize.transaction();
  try {
    const { id } = req.params;
    const { unit, uomCode, serialNumber } = req.body;
    if (uomCode !== undefined || serialNumber !== undefined) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Only unit name can be updated' });
    }
    const record = await Unit.findByPk(id, { transaction });
    if (!record) {
      await transaction.rollback();
      return res.status(404).json({ error: 'The unit is not present' });
    }
    if (unit === undefined || !unit.trim()) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Unit name is required' });
    }
    record.unit = unit.trim();
    await record.save({ transaction });
    await transaction.commit();
    const allUnits = await Unit.findAll({ order: [['serialNumber', 'ASC']] });
    return res.status(200).json({ updatedRecord: await Unit.findByPk(id), allUnits });
  } catch (err) {
    await transaction.rollback();
    if (err instanceof UniqueConstraintError) return res.status(409).json({ error: 'Duplicate value.', details: err.errors.map(e => ({ path: e.path, value: e.value })) });
    if (err instanceof ValidationError) return res.status(400).json({ error: 'Validation error', details: err.errors.map(e => ({ path: e.path, message: e.message })) });
    console.error('updateUnit error:', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
};

exports.deleteUnit = async (req, res) => {
  const transaction = await Unit.sequelize.transaction();
  try {
    const { id } = req.params;
    const unit = await Unit.findByPk(id, { transaction });
    if (!unit) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Record not found' });
    }
    const taxInfoUsage = await TaxInfo.findOne({ where: { uomCode: unit.uomCode }, transaction });
    if (taxInfoUsage) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Cannot delete unit as it is referenced in tax information records' });
    }
    await unit.destroy({ transaction });
    await resequenceSerialNumbers(transaction);
    await transaction.commit();
    return res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    await transaction.rollback();
    console.error('deleteUnit error:', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
};


