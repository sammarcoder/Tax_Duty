// // controllers/fileHeader.controller.js
// const { Op } = require('sequelize');
// const FileHeader = require('../models/fileHeader.model');
// const FileDetail = require('../models/fileDetail.model');
// const TaxInfo = require('../models/taxInfo.model');
// const Unit = require('../models/unit.model');

// // Generate unique file number
// const generateFileNumber = async (transaction) => {
//   const date = new Date();
//   const dateStr = date.getFullYear() + '/' +
//                  String(date.getMonth() + 1).padStart(2, '0') + '/' +
//                  String(date.getDate()).padStart(2, '0');
  
//   const filePrefix = `FH- ${dateStr}`;  // Note the space after FH- for File Header
  
//   const latestFile = await FileHeader.findOne({
//     where: {
//       fileNumber: {
//         [Op.like]: `${filePrefix}-%`
//       }
//     },
//     order: [['fileNumber', 'DESC']],
//     transaction
//   });

//   let sequence = 1;
//   if (latestFile) {
//     const parts = latestFile.fileNumber.split('-');
//     if (parts.length === 3) {
//       sequence = parseInt(parts[2]) + 1;
//     }
//   }

//   return `${filePrefix}-${String(sequence).padStart(4, '0')}`;
// };

// // Create file with multiple items
// exports.createFileHeaderWithDetails = async (req, res) => {
//   const transaction = await FileHeader.sequelize.transaction();
//   try {
//     const { 
//       exchangeRate, 
//       valueAdditionRate, 
//       currency,
//       items // Array of items with their details
//     } = req.body;
    
//     // Validate required fields
//     if (!exchangeRate || !currency || !items || !Array.isArray(items) || items.length === 0) {
//       await transaction.rollback();
//       return res.status(400).json({ error: "Missing required fields or invalid items array" });
//     }
    
//     // Generate unique file number
//     const fileNumber = await generateFileNumber(transaction);
    
//     // Create file header
//     const fileHeader = await FileHeader.create({
//       fileNumber,
//       exchangeRate,
//       valueAdditionRate: valueAdditionRate || 1.1,
//       currency
//     }, { transaction });
    
//     // Process each item
//     const fileDetails = [];
//     for (const item of items) {
//       // Find tax info for the item
//       let taxInfo;
//       if (item.taxInfoId) {
//         taxInfo = await TaxInfo.findByPk(item.taxInfoId, { transaction });
//       } else if (item.itemName) {
//         taxInfo = await TaxInfo.findOne({
//           where: { itemName: item.itemName },
//           transaction
//         });
//       } else {
//         continue; // Skip items without identifier
//       }
      
//       if (!taxInfo) {
//         continue; // Skip items not found
//       }
      
//       // Calculate total values
//       const quantity = item.quantity || 1;
//       const assessableValue = item.assessableValue || taxInfo.assessableValue;
//       const totalAssessableValue = quantity * assessableValue;
      
//       // Apply tax rates (either from the item override or from taxInfo)
//       const customDuty = item.customDuty !== undefined ? item.customDuty : taxInfo.customDuty;
//       const acd = item.acd !== undefined ? item.acd : taxInfo.acd;
//       const rd = item.rd !== undefined ? item.rd : taxInfo.rd;
//       const ftaCustomDuty = item.ftaCustomDuty !== undefined ? item.ftaCustomDuty : taxInfo.ftaCustomDuty;
//       const salesTax = item.salesTax !== undefined ? item.salesTax : taxInfo.salesTax;
//       const additionalSalesTax = item.additionalSalesTax !== undefined ? item.additionalSalesTax : taxInfo.additionalSalesTax;
//       const furtherTax = item.furtherTax !== undefined ? item.furtherTax : taxInfo.furtherTax;
//       const incomeTaxImport = item.incomeTaxImport !== undefined ? item.incomeTaxImport : taxInfo.incomeTaxImport;
//       const incomeTaxWithheld = item.incomeTaxWithheld !== undefined ? item.incomeTaxWithheld : taxInfo.incomeTaxWithheld;
      
//       // Calculate duty value based on applicable rates
//       const dutyValue = item.dutyValue || (assessableValue * 
//         (customDuty + acd + rd + ftaCustomDuty + salesTax + 
//          additionalSalesTax + furtherTax + incomeTaxImport + 
//          incomeTaxWithheld) / 100);
      
//       const totalDutyValue = quantity * dutyValue;
      
//       // Create file detail entry
//       const fileDetail = await FileDetail.create({
//         fileHeaderId: fileHeader.id,
//         taxInfoId: taxInfo.id,
//         quantity,
//         assessableValue,
//         dutyValue,
//         customDuty,
//         acd,
//         rd,
//         ftaCustomDuty,
//         salesTax,
//         additionalSalesTax,
//         furtherTax,
//         incomeTaxImport,
//         incomeTaxWithheld,
//         totalAssessableValue,
//         totalDutyValue,
//         remarks: item.remarks
//       }, { transaction });
      
//       fileDetails.push(fileDetail);
//     }
    
//     await transaction.commit();
    
//     // Return the created file with its details
//     return res.status(201).json({
//       fileHeader,
//       fileDetails
//     });
    
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in createFileHeaderWithDetails:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Get all file headers
// exports.getAllFileHeaders = async (req, res) => {
//   try {
//     const fileHeaders = await FileHeader.findAll({
//       include: [{
//         model: FileDetail,
//         as: 'details',
//         include: [{
//           model: TaxInfo,
//           include: [{ model: Unit, attributes: ['unit'] }]
//         }]
//       }],
//       order: [['createdAt', 'DESC']]
//     });
    
//     return res.status(200).json(fileHeaders);
//   } catch (error) {
//     console.error("Error in getAllFileHeaders:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Get file with all its details
// exports.getFileHeaderById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const fileHeader = await FileHeader.findByPk(id, {
//       include: [{
//         model: FileDetail,
//         as: 'details',
//         include: [{
//           model: TaxInfo,
//           include: [{ model: Unit, attributes: ['unit'] }]
//         }]
//       }]
//     });
    
//     if (!fileHeader) {
//       return res.status(404).json({ error: "File not found" });
//     }
    
//     return res.status(200).json(fileHeader);
//   } catch (error) {
//     console.error("Error in getFileHeaderById:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Update file header
// exports.updateFileHeader = async (req, res) => {
//   const transaction = await FileHeader.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const { exchangeRate, valueAdditionRate, currency } = req.body;
    
//     const fileHeader = await FileHeader.findByPk(id, { transaction });
//     if (!fileHeader) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File header not found" });
//     }
    
//     // Update fields if provided
//     if (exchangeRate !== undefined) fileHeader.exchangeRate = exchangeRate;
//     if (valueAdditionRate !== undefined) fileHeader.valueAdditionRate = valueAdditionRate;
//     if (currency !== undefined) fileHeader.currency = currency;
    
//     await fileHeader.save({ transaction });
    
//     await transaction.commit();
    
//     return res.status(200).json(fileHeader);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileHeader:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Add item to existing file
// exports.addItemToFile = async (req, res) => {
//   const transaction = await FileHeader.sequelize.transaction();
//   try {
//     const fileHeaderId = req.params.id;
//     const { 
//       taxInfoId,
//       itemName,
//       quantity = 1,
//       assessableValue,
//       dutyValue,
//       customDuty,
//       acd,
//       rd,
//       ftaCustomDuty,
//       salesTax,
//       additionalSalesTax,
//       furtherTax,
//       incomeTaxImport,
//       incomeTaxWithheld,
//       remarks
//     } = req.body;
    
//     // Check if file header exists
//     const fileHeader = await FileHeader.findByPk(fileHeaderId, { transaction });
//     if (!fileHeader) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File header not found" });
//     }
    
//     // Find tax info for the item
//     let taxInfo;
//     if (taxInfoId) {
//       taxInfo = await TaxInfo.findByPk(taxInfoId, { transaction });
//     } else if (itemName) {
//       taxInfo = await TaxInfo.findOne({
//         where: { itemName: itemName },
//         transaction
//       });
//     } else {
//       await transaction.rollback();
//       return res.status(400).json({ error: "Please provide either taxInfoId or itemName" });
//     }
    
//     if (!taxInfo) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "Tax information not found" });
//     }
    
//     // Calculate values
//     const aValue = assessableValue || taxInfo.assessableValue;
//     const totalAssessableValue = quantity * aValue;
    
//     // Apply tax rates (from request or default to taxInfo values)
//     const cDuty = customDuty !== undefined ? customDuty : taxInfo.customDuty;
//     const acdValue = acd !== undefined ? acd : taxInfo.acd;
//     const rdValue = rd !== undefined ? rd : taxInfo.rd;
//     const ftaValue = ftaCustomDuty !== undefined ? ftaCustomDuty : taxInfo.ftaCustomDuty;
//     const salesTaxValue = salesTax !== undefined ? salesTax : taxInfo.salesTax;
//     const addSalesTaxValue = additionalSalesTax !== undefined ? additionalSalesTax : taxInfo.additionalSalesTax;
//     const furtherTaxValue = furtherTax !== undefined ? furtherTax : taxInfo.furtherTax;
//     const incomeTaxImpValue = incomeTaxImport !== undefined ? incomeTaxImport : taxInfo.incomeTaxImport;
//     const incomeTaxWithValue = incomeTaxWithheld !== undefined ? incomeTaxWithheld : taxInfo.incomeTaxWithheld;
    
//     // Calculate duty value
//     const dValue = dutyValue || (aValue * 
//       (cDuty + acdValue + rdValue + ftaValue + salesTaxValue + 
//        addSalesTaxValue + furtherTaxValue + incomeTaxImpValue + 
//        incomeTaxWithValue) / 100);
    
//     const totalDutyValue = quantity * dValue;
    
//     // Create file detail
//     const fileDetail = await FileDetail.create({
//       fileHeaderId: fileHeader.id,
//       taxInfoId: taxInfo.id,
//       quantity,
//       assessableValue: aValue,
//       dutyValue: dValue,
//       customDuty: cDuty,
//       acd: acdValue,
//       rd: rdValue,
//       ftaCustomDuty: ftaValue,
//       salesTax: salesTaxValue,
//       additionalSalesTax: addSalesTaxValue,
//       furtherTax: furtherTaxValue,
//       incomeTaxImport: incomeTaxImpValue,
//       incomeTaxWithheld: incomeTaxWithValue,
//       totalAssessableValue,
//       totalDutyValue,
//       remarks: remarks || `Item ${taxInfo.itemName} added to file ${fileHeader.fileNumber}`
//     }, { transaction });
    
//     await transaction.commit();
    
//     return res.status(201).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in addItemToFile:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Update item in file
// exports.updateFileItem = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const { 
//       quantity,
//       assessableValue,
//       dutyValue,
//       customDuty,
//       acd,
//       rd,
//       ftaCustomDuty,
//       salesTax,
//       additionalSalesTax,
//       furtherTax,
//       incomeTaxImport,
//       incomeTaxWithheld,
//       remarks 
//     } = req.body;
    
//     const fileDetail = await FileDetail.findByPk(id, { 
//       transaction,
//       include: [{ model: TaxInfo }] 
//     });
    
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Update fields if provided
//     if (quantity !== undefined) fileDetail.quantity = quantity;
//     if (assessableValue !== undefined) fileDetail.assessableValue = assessableValue;
//     if (dutyValue !== undefined) fileDetail.dutyValue = dutyValue;
//     if (customDuty !== undefined) fileDetail.customDuty = customDuty;
//     if (acd !== undefined) fileDetail.acd = acd;
//     if (rd !== undefined) fileDetail.rd = rd;
//     if (ftaCustomDuty !== undefined) fileDetail.ftaCustomDuty = ftaCustomDuty;
//     if (salesTax !== undefined) fileDetail.salesTax = salesTax;
//     if (additionalSalesTax !== undefined) fileDetail.additionalSalesTax = additionalSalesTax;
//     if (furtherTax !== undefined) fileDetail.furtherTax = furtherTax;
//     if (incomeTaxImport !== undefined) fileDetail.incomeTaxImport = incomeTaxImport;
//     if (incomeTaxWithheld !== undefined) fileDetail.incomeTaxWithheld = incomeTaxWithheld;
//     if (remarks !== undefined) fileDetail.remarks = remarks;
    
//     // Recalculate totals if quantity or assessableValue changed
//     if (quantity !== undefined || assessableValue !== undefined) {
//       const qty = fileDetail.quantity;
//       const aValue = fileDetail.assessableValue;
//       fileDetail.totalAssessableValue = qty * aValue;
      
//       // Recalculate duty value if not explicitly provided
//       if (dutyValue === undefined) {
//         const newDutyValue = aValue * (
//           fileDetail.customDuty + 
//           fileDetail.acd + 
//           fileDetail.rd + 
//           fileDetail.ftaCustomDuty + 
//           fileDetail.salesTax + 
//           fileDetail.additionalSalesTax + 
//           fileDetail.furtherTax + 
//           fileDetail.incomeTaxImport + 
//           fileDetail.incomeTaxWithheld
//         ) / 100;
        
//         fileDetail.dutyValue = newDutyValue;
//         fileDetail.totalDutyValue = qty * newDutyValue;
//       } else {
//         fileDetail.totalDutyValue = qty * fileDetail.dutyValue;
//       }
//     }
    
//     await fileDetail.save({ transaction });
    
//     await transaction.commit();
    
//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileItem:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Remove item from file
// exports.removeItemFromFile = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Delete the file detail
//     await fileDetail.destroy({ transaction });
    
//     await transaction.commit();
    
//     return res.status(204).send();
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in removeItemFromFile:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Delete file with all its items
// exports.deleteFileHeader = async (req, res) => {
//   const transaction = await FileHeader.sequelize.transaction();
//   try {
//     const { id } = req.params;
    
//     const fileHeader = await FileHeader.findByPk(id, { 
//       include: [{ model: FileDetail, as: 'details' }],
//       transaction 
//     });
    
//     if (!fileHeader) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File header not found" });
//     }
    
//     // Delete all associated file details
//     await FileDetail.destroy({
//       where: { fileHeaderId: id },
//       transaction
//     });
    
//     // Delete the file header
//     await fileHeader.destroy({ transaction });
    
//     await transaction.commit();
    
//     return res.status(204).send();
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in deleteFileHeader:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };







































// controllers/fileHeader.controller.js
const { Op } = require('sequelize');
const db = require('../models');
const FileHeader = db.FileHeader;
const FileDetail = db.FileDetail;
const TaxInfo = db.TaxInfo;
const Unit = db.Unit;

// Generate unique file number
const generateFileNumber = async (transaction) => {
  const date = new Date();
  const dateStr = date.getFullYear() + '/' +
                 String(date.getMonth() + 1).padStart(2, '0') + '/' +
                 String(date.getDate()).padStart(2, '0');
  
  const filePrefix = `FH-${dateStr}`;
  
  const latestFile = await FileHeader.findOne({
    where: {
      fileNumber: {
        [Op.like]: `${filePrefix}-%`
      }
    },
    order: [['fileNumber', 'DESC']],
    transaction
  });

  let sequence = 1;
  if (latestFile) {
    const parts = latestFile.fileNumber.split('-');
    if (parts.length === 3) {
      sequence = parseInt(parts[2]) + 1;
    }
  }

  return `${filePrefix}-${String(sequence).padStart(4, '0')}`;
};

// Create file header with multiple items
exports.createFileHeaderWithDetails = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { 
      fileName,
      exchangeRate, 
      landedCost,
      valueAdditionRate, 
      currency,
      items // Array of items with their details
    } = req.body;
    
    // Validate required fields
    if (!fileName ||!exchangeRate || !landedCost || !currency || !items || !Array.isArray(items) || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Missing required fields or invalid items array" });
    }
    
    // Generate unique file number
    const fileNumber = await generateFileNumber(transaction);
    
    // Create file header
    const fileHeader = await FileHeader.create({
      fileName,
      fileNumber,
      exchangeRate,
      landedCost,
      valueAdditionRate: valueAdditionRate || 1.1,
      currency
    }, { transaction });
    
    // Process each item
    const fileDetails = [];
    for (const item of items) {
      // Find tax info for the item
      let taxInfo;
      if (item.taxInfoId) {
        taxInfo = await TaxInfo.findByPk(item.taxInfoId, { transaction });
      } else if (item.itemName) {
        taxInfo = await TaxInfo.findOne({
          where: { itemName: item.itemName },
          transaction
        });
      } else {
        continue; // Skip items without identifier
      }
      
      if (!taxInfo) {
        continue; // Skip items not found
      }
      
      // Get quantities
      const assessableQuantity = item.assessableQuantity || 1;
      const dutyQuantity = item.dutyQuantity || assessableQuantity; // Default to same as assessable quantity
      
      // Calculate values
      const assessableValue = item.assessableValue || taxInfo.assessableValue;
      const totalAssessableValue = assessableQuantity * assessableValue;
      
      // Apply tax rates (either from the item override or from taxInfo)
      const customDuty = item.customDuty !== undefined ? item.customDuty : taxInfo.customDuty;
      const acd = item.acd !== undefined ? item.acd : taxInfo.acd;
      const rd = item.rd !== undefined ? item.rd : taxInfo.rd;
      const ftaCustomDuty = item.ftaCustomDuty !== undefined ? item.ftaCustomDuty : taxInfo.ftaCustomDuty;
      const salesTax = item.salesTax !== undefined ? item.salesTax : taxInfo.salesTax;
      const additionalSalesTax = item.additionalSalesTax !== undefined ? item.additionalSalesTax : taxInfo.additionalSalesTax;
      const furtherTax = item.furtherTax !== undefined ? item.furtherTax : taxInfo.furtherTax;
      const incomeTaxImport = item.incomeTaxImport !== undefined ? item.incomeTaxImport : taxInfo.incomeTaxImport;
      const incomeTaxWithheld = item.incomeTaxWithheld !== undefined ? item.incomeTaxWithheld : taxInfo.incomeTaxWithheld;
      
      // Calculate duty value based on applicable rates
      const dutyValue = item.dutyValue || (assessableValue * 
        (customDuty + acd + rd + ftaCustomDuty + salesTax + 
         additionalSalesTax + furtherTax + incomeTaxImport + 
         incomeTaxWithheld) / 100);
      
      const totalDutyValue = dutyQuantity * dutyValue;
      
      // Calculate grand total
      const total = totalAssessableValue + totalDutyValue;
      
      // Create file detail entry
      const fileDetail = await FileDetail.create({
        fileHeaderId: fileHeader.id,
        taxInfoId: taxInfo.id,
        assessableQuantity,
        assessableValue,
        totalAssessableValue,
        dutyQuantity,
        dutyValue,
        totalDutyValue,
        total,
        hsCode: taxInfo.hsCode,
        itemName: taxInfo.itemName,
        uomCode: taxInfo.uomCode,
        customDuty,
        acd,
        rd,
        ftaCustomDuty,
        salesTax,
        additionalSalesTax,
        furtherTax,
        incomeTaxImport,
        incomeTaxWithheld,
        remarks: item.remarks
      }, { transaction });
      
      fileDetails.push(fileDetail);
    }
    
    await transaction.commit();
    
    // Return the created file with its details
    return res.status(201).json({
      fileHeader,
      fileDetails
    });
    
  } catch (error) {
    await transaction.rollback();
    console.error("Error in createFileHeaderWithDetails:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Get all file headers
exports.getAllFileHeaders = async (req, res) => {
  try {
    const fileHeaders = await FileHeader.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: FileDetail,
        as: 'details',
        attributes: ['id'] // Just to get the count
      }]
    });
    
    // Add item count to each header
    const result = fileHeaders.map(header => {
      const plainHeader = header.get({ plain: true });
      plainHeader.itemCount = plainHeader.details ? plainHeader.details.length : 0;
      delete plainHeader.details; // Remove the details array
      return plainHeader;
    });
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAllFileHeaders:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Get file header by ID with all details
exports.getFileHeaderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const fileHeader = await FileHeader.findByPk(id, {
      include: [{
        model: FileDetail,
        as: 'details',
        include: [{
          model: TaxInfo,
          include: [{ model: Unit, attributes: ['unit'] }]
        }]
      }]
    });
    
    if (!fileHeader) {
      return res.status(404).json({ error: "File not found" });
    }
    
    return res.status(200).json(fileHeader);
  } catch (error) {
    console.error("Error in getFileHeaderById:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Update file header
// exports.updateFileHeader = async (req, res) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const { exchangeRate, valueAdditionRate, currency } = req.body;
    
//     const fileHeader = await FileHeader.findByPk(id, { transaction });
//     if (!fileHeader) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File header not found" });
//     }
    
//     // Update fields if provided
//     if (exchangeRate !== undefined) fileHeader.exchangeRate = exchangeRate;
//     if (valueAdditionRate !== undefined) fileHeader.valueAdditionRate = valueAdditionRate;
//     if (currency !== undefined) fileHeader.currency = currency;
    
//     await fileHeader.save({ transaction });
    
//     await transaction.commit();
    
//     return res.status(200).json(fileHeader);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileHeader:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };













// Update file header
exports.updateFileHeader = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { fileName, exchangeRate, landedCost, valueAdditionRate, currency } = req.body;
    
    const fileHeader = await FileHeader.findByPk(id, { transaction });
    if (!fileHeader) {
      await transaction.rollback();
      return res.status(404).json({ error: "File header not found" });
    }
    
    // Update fields if provided
    if (fileName !== undefined) fileHeader.fileName = fileName;
    if (exchangeRate !== undefined) fileHeader.exchangeRate = exchangeRate;
    if (landedCost !== undefined) fileHeader.landedCost = landedCost;
    if (valueAdditionRate !== undefined) fileHeader.valueAdditionRate = valueAdditionRate;
    if (currency !== undefined) fileHeader.currency = currency;
    
    await fileHeader.save({ transaction });
    
    await transaction.commit();
    
    return res.status(200).json(fileHeader);
  } catch (error) {
    await transaction.rollback();
    console.error("Error in updateFileHeader:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};







// Delete file header and all its details
exports.deleteFileHeader = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    
    // Check if file header exists
    const fileHeader = await FileHeader.findByPk(id, { transaction });
    if (!fileHeader) {
      await transaction.rollback();
      return res.status(404).json({ error: "File header not found" });
    }
    
    // Delete all file details associated with this header
    await FileDetail.destroy({
      where: { fileHeaderId: id },
      transaction
    });
    
    // Delete the file header
    await fileHeader.destroy({ transaction });
    
    await transaction.commit();
    
    return res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    console.error("Error in deleteFileHeader:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};
