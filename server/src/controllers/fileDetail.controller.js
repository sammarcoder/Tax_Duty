// const { Op } = require('sequelize');
// const FileDetail = require('../models/fileDetail.model');
// const TaxInfo = require('../models/taxInfo.model');
// const Unit = require('../models/unit.model');

// // Function to generate a unique file number with the requested format
// const generateFileNumber = async (transaction) => {
//   const date = new Date();
//   const dateStr = date.getFullYear()+ '/' +
//                  String(date.getMonth() + 1).padStart(2, '0') + '/' +
//                  String(date.getDate()).padStart(2, '0');
  
//   const filePrefix = `FD- ${dateStr}`;  // Note the space after FD-
  
//   const latestFile = await FileDetail.findOne({
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

// exports.createFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { 
//       itemName, 
//       itemId, 
//       assessableValue,
//       dutyValue,
//       totalAssessableValue,
//       totalDutyValue,
//       remarks 
//     } = req.body;
    
//     // Find tax info either by ID or name
//     let taxInfo;
//     if (itemId) {
//       taxInfo = await TaxInfo.findByPk(itemId, { 
//         include: [{ model: Unit, attributes: ['unit'] }],
//         transaction 
//       });
//     } else if (itemName) {
//       taxInfo = await TaxInfo.findOne({
//         where: { itemName: itemName },
//         include: [{ model: Unit, attributes: ['unit'] }],
//         transaction
//       });
//     } else {
//       await transaction.rollback();
//       return res.status(400).json({ error: "Please provide either itemName or itemId" });
//     }
    
//     if (!taxInfo) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "Tax information not found" });
//     }
    
//     // Generate a unique file number with the new format
//     const fileNumber = await generateFileNumber(transaction);
    
//     // Create new file detail with tax info data and user-provided values
//     const fileDetail = await FileDetail.create({
//       fileNumber: fileNumber,
//       hsCode: taxInfo.hsCode,
//       itemName: taxInfo.itemName,
//       uomCode: taxInfo.uomCode,
//       // Use tax info values for tax rates
//       customDuty: taxInfo.customDuty,
//       acd: taxInfo.acd,
//       rd: taxInfo.rd,
//       ftaCustomDuty: taxInfo.ftaCustomDuty,
//       salesTax: taxInfo.salesTax,
//       additionalSalesTax: taxInfo.additionalSalesTax,
//       furtherTax: taxInfo.furtherTax,
//       incomeTaxImport: taxInfo.incomeTaxImport,
//       incomeTaxWithheld: taxInfo.incomeTaxWithheld,
//       // User provided values (with fallbacks to tax info values)
//       assessableValue: assessableValue || taxInfo.assessableValue,
//       dutyValue: dutyValue || 0,
//       totalAssessableValue: totalAssessableValue || assessableValue || taxInfo.assessableValue,
//       totalDutyValue: totalDutyValue || dutyValue || 0,
//       remarks: remarks || `File for ${taxInfo.itemName}`
//     }, { transaction });
    
//     // Update the tax info record with the file detail ID
//     await taxInfo.update({ fileDetailId: fileDetail.id }, { transaction });
    
//     await transaction.commit();
    
//     return res.status(201).json({
//       fileDetail,
//       taxInfoSource: taxInfo
//     });
    
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in createFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.getAllFileDetails = async (req, res) => {
//   try {
//     const fileDetails = await FileDetail.findAll({
//       order: [['createdAt', 'DESC']]
//     });
    
//     return res.status(200).json(fileDetails);
//   } catch (error) {
//     console.error("Error in getAllFileDetails:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.getFileDetailById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id);
//     if (!fileDetail) {
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Find the tax info record linked to this file detail
//     const taxInfo = await TaxInfo.findOne({
//       where: { fileDetailId: id },
//       include: [{ model: Unit, attributes: ['unit'] }]
//     });
    
//     return res.status(200).json({
//       fileDetail,
//       taxInfo
//     });
//   } catch (error) {
//     console.error("Error in getFileDetailById:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.updateFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const { 
//       assessableValue,
//       dutyValue,
//       totalAssessableValue,
//       totalDutyValue,
//       remarks 
//     } = req.body;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Update only the fields that are provided
//     if (assessableValue !== undefined) fileDetail.assessableValue = assessableValue;
//     if (dutyValue !== undefined) fileDetail.dutyValue = dutyValue;
//     if (totalAssessableValue !== undefined) fileDetail.totalAssessableValue = totalAssessableValue;
//     if (totalDutyValue !== undefined) fileDetail.totalDutyValue = totalDutyValue;
//     if (remarks !== undefined) fileDetail.remarks = remarks;
    
//     await fileDetail.save({ transaction });
    
//     await transaction.commit();
    
//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.deleteFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Unlink any tax info records
//     await TaxInfo.update(
//       { fileDetailId: null },
//       { where: { fileDetailId: id }, transaction }
//     );
    
//     // Delete the file detail
//     await fileDetail.destroy({ transaction });
    
//     await transaction.commit();
    
//     return res.status(204).send();
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in deleteFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };






































// const { Op } = require('sequelize');
// const FileDetail = require('../models/fileDetail.model');
// const TaxInfo = require('../models/taxInfo.model');
// const Unit = require('../models/unit.model');

// // Function to generate a unique file number with the requested format
// const generateFileNumber = async (transaction) => {
//   const date = new Date();
//   const dateStr = date.getFullYear()+ '/' +
//                  String(date.getMonth() + 1).padStart(2, '0') + '/' +
//                  String(date.getDate()).padStart(2, '0');
  
//   const filePrefix = `FD- ${dateStr}`;  // Note the space after FD-
  
//   const latestFile = await FileDetail.findOne({
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

// exports.createFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { 
//       itemName, 
//       itemId, 
//       assessableValue,
//       dutyValue,
//       totalAssessableValue,
//       totalDutyValue,
//       remarks 
//     } = req.body;
    
//     // Find tax info either by ID or name
//     let taxInfo;
//     if (itemId) {
//       taxInfo = await TaxInfo.findByPk(itemId, { 
//         include: [{ model: Unit, attributes: ['unit'] }],
//         transaction 
//       });
//     } else if (itemName) {
//       taxInfo = await TaxInfo.findOne({
//         where: { itemName: itemName },
//         include: [{ model: Unit, attributes: ['unit'] }],
//         transaction
//       });
//     } else {
//       await transaction.rollback();
//       return res.status(400).json({ error: "Please provide either itemName or itemId" });
//     }
    
//     if (!taxInfo) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "Tax information not found" });
//     }
    
//     // Validate required fields
//     if (!assessableValue || !dutyValue || !totalAssessableValue || !totalDutyValue) {
//       await transaction.rollback();
//       return res.status(400).json({ error: "Missing required values: assessableValue, dutyValue, totalAssessableValue, and totalDutyValue are required" });
//     }
    
//     // Generate a unique file number with the new format
//     const fileNumber = await generateFileNumber(transaction);
    
//     // Create new file detail with tax info data and user-provided values
//     const fileDetail = await FileDetail.create({
//       fileNumber: fileNumber,
//       hsCode: taxInfo.hsCode,
//       itemName: taxInfo.itemName,
//       uomCode: taxInfo.uomCode,
//       // Use tax info values for tax rates
//       customDuty: taxInfo.customDuty,
//       acd: taxInfo.acd,
//       rd: taxInfo.rd,
//       ftaCustomDuty: taxInfo.ftaCustomDuty,
//       salesTax: taxInfo.salesTax,
//       additionalSalesTax: taxInfo.additionalSalesTax,
//       furtherTax: taxInfo.furtherTax,
//       incomeTaxImport: taxInfo.incomeTaxImport,
//       incomeTaxWithheld: taxInfo.incomeTaxWithheld,
//       // User provided values
//       assessableValue: assessableValue,
//       dutyValue: dutyValue,
//       totalAssessableValue: totalAssessableValue,
//       totalDutyValue: totalDutyValue,
//       remarks: remarks || `File for ${taxInfo.itemName}`
//     }, { transaction });
    
//     // Update the tax info record with the file detail ID
//     await taxInfo.update({ fileDetailId: fileDetail.id }, { transaction });
    
//     await transaction.commit();
    
//     return res.status(201).json({
//       fileDetail,
//       taxInfoSource: taxInfo
//     });
    
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in createFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Other methods remain unchanged
// exports.getAllFileDetails = async (req, res) => {
//   try {
//     const fileDetails = await FileDetail.findAll({
//       order: [['createdAt', 'DESC']]
//     });
    
//     return res.status(200).json(fileDetails);
//   } catch (error) {
//     console.error("Error in getAllFileDetails:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.getFileDetailById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id);
//     if (!fileDetail) {
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Find the tax info record linked to this file detail
//     const taxInfo = await TaxInfo.findOne({
//       where: { fileDetailId: id },
//       include: [{ model: Unit, attributes: ['unit'] }]
//     });
    
//     return res.status(200).json({
//       fileDetail,
//       taxInfo
//     });
//   } catch (error) {
//     console.error("Error in getFileDetailById:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.updateFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const { 
//       assessableValue,
//       dutyValue,
//       totalAssessableValue,
//       totalDutyValue,
//       remarks 
//     } = req.body;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Update only the fields that are provided
//     if (assessableValue !== undefined) fileDetail.assessableValue = assessableValue;
//     if (dutyValue !== undefined) fileDetail.dutyValue = dutyValue;
//     if (totalAssessableValue !== undefined) fileDetail.totalAssessableValue = totalAssessableValue;
//     if (totalDutyValue !== undefined) fileDetail.totalDutyValue = totalDutyValue;
//     if (remarks !== undefined) fileDetail.remarks = remarks;
    
//     await fileDetail.save({ transaction });
    
//     await transaction.commit();
    
//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.deleteFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Unlink any tax info records
//     await TaxInfo.update(
//       { fileDetailId: null },
//       { where: { fileDetailId: id }, transaction }
//     );
    
//     // Delete the file detail
//     await fileDetail.destroy({ transaction });
    
//     await transaction.commit();
    
//     return res.status(204).send();
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in deleteFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

































// const { Op } = require('sequelize');
// const FileDetail = require('../models/fileDetail.model');
// const TaxInfo = require('../models/taxInfo.model');
// const Unit = require('../models/unit.model');

// // Function to generate a unique file number with the requested format
// const generateFileNumber = async (transaction) => {
//   const date = new Date();
//   const dateStr = date.getFullYear() + '/' +
//                  String(date.getMonth() + 1).padStart(2, '0') + '/' +
//                  String(date.getDate()).padStart(2, '0');
  
//   const filePrefix = `FD- ${dateStr}`;  // Note the space after FD-
  
//   const latestFile = await FileDetail.findOne({
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

// exports.createFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { 
//       itemName,
//       itemId,
//       hsCode,
//       uomCode,
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
//       totalAssessableValue,
//       totalDutyValue,
//       remarks
//     } = req.body;
    
//     // Find tax info either by ID or name
//     let taxInfo;
//     if (itemId) {
//       taxInfo = await TaxInfo.findByPk(itemId, { 
//         include: [{ model: Unit, attributes: ['unit'] }],
//         transaction 
//       });
//     } else if (itemName) {
//       taxInfo = await TaxInfo.findOne({
//         where: { itemName: itemName },
//         include: [{ model: Unit, attributes: ['unit'] }],
//         transaction
//       });
//     } else {
//       await transaction.rollback();
//       return res.status(400).json({ error: "Please provide either itemName or itemId" });
//     }
    
//     if (!taxInfo) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "Tax information not found" });
//     }
    
//     // Generate a unique file number with the new format
//     const fileNumber = await generateFileNumber(transaction);
    
//     // Create new file detail with all the provided fields
//     const fileDetail = await FileDetail.create({
//       fileNumber: fileNumber,
//       hsCode: hsCode || taxInfo.hsCode,
//       itemName: taxInfo.itemName,
//       uomCode: uomCode || taxInfo.uomCode,
//       assessableValue: assessableValue,
//       dutyValue: dutyValue,
//       // Use provided tax values or default to tax info values
//       customDuty: customDuty !== undefined ? customDuty : taxInfo.customDuty,
//       acd: acd !== undefined ? acd : taxInfo.acd,
//       rd: rd !== undefined ? rd : taxInfo.rd,
//       ftaCustomDuty: ftaCustomDuty !== undefined ? ftaCustomDuty : taxInfo.ftaCustomDuty,
//       salesTax: salesTax !== undefined ? salesTax : taxInfo.salesTax,
//       additionalSalesTax: additionalSalesTax !== undefined ? additionalSalesTax : taxInfo.additionalSalesTax,
//       furtherTax: furtherTax !== undefined ? furtherTax : taxInfo.furtherTax,
//       incomeTaxImport: incomeTaxImport !== undefined ? incomeTaxImport : taxInfo.incomeTaxImport,
//       incomeTaxWithheld: incomeTaxWithheld !== undefined ? incomeTaxWithheld : taxInfo.incomeTaxWithheld,
//       totalAssessableValue: totalAssessableValue,
//       totalDutyValue: totalDutyValue,
//       remarks: remarks || `File for ${taxInfo.itemName}`
//     }, { transaction });
    
//     // Update the tax info record with the file detail ID
//     await taxInfo.update({ fileDetailId: fileDetail.id }, { transaction });
    
//     await transaction.commit();
    
//     return res.status(201).json({
//       fileDetail,
//       taxInfoSource: taxInfo
//     });
    
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in createFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.getAllFileDetails = async (req, res) => {
//   try {
//     const fileDetails = await FileDetail.findAll({
//       order: [['createdAt', 'DESC']]
//     });
    
//     return res.status(200).json(fileDetails);
//   } catch (error) {
//     console.error("Error in getAllFileDetails:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.getFileDetailById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id);
//     if (!fileDetail) {
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Find the tax info record linked to this file detail
//     const taxInfo = await TaxInfo.findOne({
//       where: { fileDetailId: id },
//       include: [{ model: Unit, attributes: ['unit'] }]
//     });
    
//     return res.status(200).json({
//       fileDetail,
//       taxInfo
//     });
//   } catch (error) {
//     console.error("Error in getFileDetailById:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.updateFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const { 
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
//       totalAssessableValue,
//       totalDutyValue,
//       remarks 
//     } = req.body;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Update all provided fields
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
//     if (totalAssessableValue !== undefined) fileDetail.totalAssessableValue = totalAssessableValue;
//     if (totalDutyValue !== undefined) fileDetail.totalDutyValue = totalDutyValue;
//     if (remarks !== undefined) fileDetail.remarks = remarks;
    
//     await fileDetail.save({ transaction });
    
//     await transaction.commit();
    
//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// exports.deleteFileDetail = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id, { transaction });
//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     // Unlink any tax info records
//     await TaxInfo.update(
//       { fileDetailId: null },
//       { where: { fileDetailId: id }, transaction }
//     );
    
//     // Delete the file detail
//     await fileDetail.destroy({ transaction });
    
//     await transaction.commit();
    
//     return res.status(204).send();
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in deleteFileDetail:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };



























// // controllers/fileDetail.controller.js
// const { Op } = require('sequelize');
// const FileDetail = require('../models/fileDetail.model');
// const FileHeader = require('../models/fileHeader.model');
// const TaxInfo = require('../models/taxInfo.model');
// const Unit = require('../models/unit.model');

// // Add a new item to an existing file header
// exports.addItemToFile = async (req, res) => {
//   const transaction = await FileDetail.sequelize.transaction();
//   try {
//     const fileHeaderId = req.params.id;
//     const { 
//       taxInfoId,
//       itemName,
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

//     // Check if file header exists
//     const fileHeader = await FileHeader.findByPk(fileHeaderId, { transaction });
//     if (!fileHeader) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File header not found" });
//     }
    
//     // Find tax info either by ID or name
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
    
//     // Calculate total values
//     const qtyValue = quantity || 1;
//     const aValue = assessableValue || taxInfo.assessableValue;
//     const totalAssessableValue = qtyValue * aValue;
    
//     // Apply tax rates (either from the item override or from taxInfo)
//     const cDuty = customDuty !== undefined ? customDuty : taxInfo.customDuty;
//     const acdValue = acd !== undefined ? acd : taxInfo.acd;
//     const rdValue = rd !== undefined ? rd : taxInfo.rd;
//     const ftaValue = ftaCustomDuty !== undefined ? ftaCustomDuty : taxInfo.ftaCustomDuty;
//     const salesTaxValue = salesTax !== undefined ? salesTax : taxInfo.salesTax;
//     const addSalesTaxValue = additionalSalesTax !== undefined ? additionalSalesTax : taxInfo.additionalSalesTax;
//     const furtherTaxValue = furtherTax !== undefined ? furtherTax : taxInfo.furtherTax;
//     const incomeTaxImpValue = incomeTaxImport !== undefined ? incomeTaxImport : taxInfo.incomeTaxImport;
//     const incomeTaxWithValue = incomeTaxWithheld !== undefined ? incomeTaxWithheld : taxInfo.incomeTaxWithheld;
    
//     // Calculate duty value based on applicable rates
//     const dValue = dutyValue || (aValue * 
//       (cDuty + acdValue + rdValue + ftaValue + salesTaxValue + 
//        addSalesTaxValue + furtherTaxValue + incomeTaxImpValue + 
//        incomeTaxWithValue) / 100);
    
//     const totalDutyValue = qtyValue * dValue;
    
//     // Create file detail entry
//     const fileDetail = await FileDetail.create({
//       fileHeaderId: fileHeader.id,
//       taxInfoId: taxInfo.id,
//       quantity: qtyValue,
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
//       remarks: remarks || `Item ${taxInfo.itemName} for file ${fileHeader.fileNumber}`
//     }, { transaction });
    
//     await transaction.commit();
    
//     return res.status(201).json(fileDetail);
    
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in addItemToFile:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Update an item in a file
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
    
//     // Update fields
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
//       const qty = quantity !== undefined ? quantity : fileDetail.quantity;
//       const aValue = assessableValue !== undefined ? assessableValue : fileDetail.assessableValue;
//       fileDetail.totalAssessableValue = qty * aValue;
      
//       // If duty value was not explicitly provided, recalculate it
//       if (dutyValue === undefined) {
//         const cDuty = customDuty !== undefined ? customDuty : fileDetail.customDuty;
//         const acdValue = acd !== undefined ? acd : fileDetail.acd;
//         const rdValue = rd !== undefined ? rd : fileDetail.rd;
//         const ftaValue = ftaCustomDuty !== undefined ? ftaCustomDuty : fileDetail.ftaCustomDuty;
//         const salesTaxValue = salesTax !== undefined ? salesTax : fileDetail.salesTax;
//         const addSalesTaxValue = additionalSalesTax !== undefined ? additionalSalesTax : fileDetail.additionalSalesTax;
//         const furtherTaxValue = furtherTax !== undefined ? furtherTax : fileDetail.furtherTax;
//         const incomeTaxImpValue = incomeTaxImport !== undefined ? incomeTaxImport : fileDetail.incomeTaxImport;
//         const incomeTaxWithValue = incomeTaxWithheld !== undefined ? incomeTaxWithheld : fileDetail.incomeTaxWithheld;
        
//         const dValue = aValue * (cDuty + acdValue + rdValue + ftaValue + salesTaxValue + 
//                               addSalesTaxValue + furtherTaxValue + incomeTaxImpValue + 
//                               incomeTaxWithValue) / 100;
//         fileDetail.dutyValue = dValue;
//         fileDetail.totalDutyValue = qty * dValue;
//       } else {
//         fileDetail.totalDutyValue = qty * dutyValue;
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

// // Delete an item from a file
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

// // Get a specific file detail by ID
// exports.getFileDetailById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const fileDetail = await FileDetail.findByPk(id, {
//       include: [{
//         model: TaxInfo,
//         include: [{ model: Unit, attributes: ['unit'] }]
//       }, {
//         model: FileHeader
//       }]
//     });
    
//     if (!fileDetail) {
//       return res.status(404).json({ error: "File detail not found" });
//     }
    
//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     console.error("Error in getFileDetailById:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };

// // Get all file details
// exports.getAllFileDetails = async (req, res) => {
//   try {
//     const fileDetails = await FileDetail.findAll({
//       include: [{
//         model: TaxInfo,
//         include: [{ model: Unit, attributes: ['unit'] }]
//       }, {
//         model: FileHeader
//       }],
//       order: [['createdAt', 'DESC']]
//     });
    
//     return res.status(200).json(fileDetails);
//   } catch (error) {
//     console.error("Error in getAllFileDetails:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };





































// controllers/fileDetail.controller.js
const db = require('../models');
const FileDetail = db.FileDetail;
const FileHeader = db.FileHeader;
const TaxInfo = db.TaxInfo;
const Unit = db.Unit;

// Add item to existing file
// exports.addItemToFile = async (req, res) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const fileHeaderId = req.params.id;
//     const {
//       taxInfoId,
//       itemName,
//       assessableQuantity = 1,
//       assessableValue,
//       dutyQuantity,
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

//     // Verify file header exists
//     const fileHeader = await FileHeader.findByPk(fileHeaderId, { transaction });
//     if (!fileHeader) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File header not found" });
//     }

//     // Find tax info
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

//     // Use dutyQuantity or default to assessableQuantity
//     const finalDutyQuantity = dutyQuantity || assessableQuantity;

//     // Calculate values
//     const aValue = assessableValue || taxInfo.assessableValue;
//     const totalAssessableValue = assessableQuantity * aValue;

//     // Get tax rates (from request or from taxInfo)
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

//     const totalDutyValue = finalDutyQuantity * dValue;
    
//     // Calculate grand total
//     const total = totalAssessableValue + totalDutyValue;

//     // Create file detail
//     const fileDetail = await FileDetail.create({
//       fileHeaderId: fileHeader.id,
//       taxInfoId: taxInfo.id,
//       assessableQuantity,
//       assessableValue: aValue,
//       totalAssessableValue,
//       dutyQuantity: finalDutyQuantity,
//       dutyValue: dValue,
//       totalDutyValue,
//       total,
//       hsCode: taxInfo.hsCode,
//       itemName: taxInfo.itemName,
//       uomCode: taxInfo.uomCode,
//       customDuty: cDuty,
//       acd: acdValue,
//       rd: rdValue,
//       ftaCustomDuty: ftaValue,
//       salesTax: salesTaxValue,
//       additionalSalesTax: addSalesTaxValue,
//       furtherTax: furtherTaxValue,
//       incomeTaxImport: incomeTaxImpValue,
//       incomeTaxWithheld: incomeTaxWithValue,
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

// Update file item
// exports.updateFileItem = async (req, res) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const {
//       assessableQuantity,
//       assessableValue,
//       dutyQuantity,
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

//     // Find the file detail
//     const fileDetail = await FileDetail.findByPk(id, {
//       transaction,
//       include: [{ model: TaxInfo }]
//     });

//     if (!fileDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: "File detail not found" });
//     }

//     // Update fields if provided
//     if (assessableQuantity !== undefined) fileDetail.assessableQuantity = assessableQuantity;
//     if (assessableValue !== undefined) fileDetail.assessableValue = assessableValue;
//     if (dutyQuantity !== undefined) fileDetail.dutyQuantity = dutyQuantity;
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

//     // Recalculate totals if quantities or values changed
//     if (assessableQuantity !== undefined || assessableValue !== undefined) {
//       fileDetail.totalAssessableValue = fileDetail.assessableQuantity * fileDetail.assessableValue;
//     }

//     // Recalculate duty value if tax rates changed or assessable value changed
//     if ([
//       'assessableValue', 'customDuty', 'acd', 'rd', 'ftaCustomDuty', 
//       'salesTax', 'additionalSalesTax', 'furtherTax', 
//       'incomeTaxImport', 'incomeTaxWithheld'
//     ].some(field => req.body[field] !== undefined) && dutyValue === undefined) {
      
//       const newDutyValue = fileDetail.assessableValue * (
//         fileDetail.customDuty + 
//         fileDetail.acd + 
//         fileDetail.rd + 
//         fileDetail.ftaCustomDuty + 
//         fileDetail.salesTax + 
//         fileDetail.additionalSalesTax + 
//         fileDetail.furtherTax + 
//         fileDetail.incomeTaxImport + 
//         fileDetail.incomeTaxWithheld
//       ) / 100;
      
//       fileDetail.dutyValue = newDutyValue;
//     }

//     // Recalculate total duty value if duty quantity or duty value changed
//     if (dutyQuantity !== undefined || dutyValue !== undefined || 
//         (assessableValue !== undefined && dutyValue === undefined)) {
//       fileDetail.totalDutyValue = fileDetail.dutyQuantity * fileDetail.dutyValue;
//     }

//     // Recalculate grand total
//     fileDetail.total = fileDetail.totalAssessableValue + fileDetail.totalDutyValue;

//     await fileDetail.save({ transaction });
//     await transaction.commit();

//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileItem:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };












// Update addItemToFile in fileDetail.controller.js
exports.addItemToFile = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const fileHeaderId = req.params.id;
    const {
      taxInfoId,
      itemName,
      assessableQuantity = 1,
      assessableValue,
      declaredQuantity,
      declaredValue,
      isCustomDutySelected = true,
      isFtaCustomDutySelected = false,
      customDuty,
      acd,
      rd,
      ftaCustomDuty,
      salesTax,
      additionalSalesTax,
      furtherTax,
      incomeTaxImport,
      incomeTaxWithheld,
      remarks
    } = req.body;

    // Verify file header exists
    const fileHeader = await FileHeader.findByPk(fileHeaderId, { transaction });
    if (!fileHeader) {
      await transaction.rollback();
      return res.status(404).json({ error: "File header not found" });
    }

    // Find tax info
    let taxInfo;
    if (taxInfoId) {
      taxInfo = await TaxInfo.findByPk(taxInfoId, { transaction });
    } else if (itemName) {
      taxInfo = await TaxInfo.findOne({
        where: { itemName: itemName },
        transaction
      });
    } else {
      await transaction.rollback();
      return res.status(400).json({ error: "Please provide either taxInfoId or itemName" });
    }

    if (!taxInfo) {
      await transaction.rollback();
      return res.status(404).json({ error: "Tax information not found" });
    }

    // Use declaredQuantity or default to assessableQuantity
    const finalDeclaredQuantity = declaredQuantity || assessableQuantity;

    // Calculate values
    const aValue = assessableValue || taxInfo.assessableValue;
    const totalAssessableValue = assessableQuantity * aValue;

    // Get tax rates (from request or from taxInfo)
    const isCustomSelected = isCustomDutySelected !== undefined ? isCustomDutySelected : true;
    const isFtaCustomSelected = isFtaCustomDutySelected !== undefined ? isFtaCustomDutySelected : false;
    
    const cDuty = isCustomSelected ? (customDuty !== undefined ? customDuty : taxInfo.customDuty) : 0;
    const ftaValue = isFtaCustomSelected ? (ftaCustomDuty !== undefined ? ftaCustomDuty : taxInfo.ftaCustomDuty) : 0;
    
    const acdValue = acd !== undefined ? acd : taxInfo.acd;
    const rdValue = rd !== undefined ? rd : taxInfo.rd;
    const salesTaxValue = salesTax !== undefined ? salesTax : taxInfo.salesTax;
    const addSalesTaxValue = additionalSalesTax !== undefined ? additionalSalesTax : taxInfo.additionalSalesTax;
    const furtherTaxValue = furtherTax !== undefined ? furtherTax : taxInfo.furtherTax;
    const incomeTaxImpValue = incomeTaxImport !== undefined ? incomeTaxImport : taxInfo.incomeTaxImport;
    const incomeTaxWithValue = incomeTaxWithheld !== undefined ? incomeTaxWithheld : taxInfo.incomeTaxWithheld;

    // Calculate declared value
    const dValue = declaredValue || (aValue *
      (cDuty + ftaValue + acdValue + rdValue + salesTaxValue +
       addSalesTaxValue + furtherTaxValue + incomeTaxImpValue +
       incomeTaxWithValue) / 100);

    const totalDeclaredValue = finalDeclaredQuantity * dValue;
    
    // Calculate grand total
    const total = totalAssessableValue + totalDeclaredValue;

    // Create file detail
    const fileDetail = await FileDetail.create({
      fileHeaderId: fileHeader.id,
      taxInfoId: taxInfo.id,
      assessableQuantity,
      assessableValue: aValue,
      totalAssessableValue,
      declaredQuantity: finalDeclaredQuantity,
      declaredValue: dValue,
      totalDeclaredValue,
      total,
      hsCode: taxInfo.hsCode,
      itemName: taxInfo.itemName,
      uomCode: taxInfo.uomCode,
      isCustomDutySelected: isCustomSelected,
      isFtaCustomDutySelected: isFtaCustomSelected,
      customDuty: cDuty,
      ftaCustomDuty: ftaValue,
      acd: acdValue,
      rd: rdValue,
      salesTax: salesTaxValue,
      additionalSalesTax: addSalesTaxValue,
      furtherTax: furtherTaxValue,
      incomeTaxImport: incomeTaxImpValue,
      incomeTaxWithheld: incomeTaxWithValue,
      remarks: remarks || `Item ${taxInfo.itemName} added to file ${fileHeader.fileNumber}`
    }, { transaction });

    await transaction.commit();

    return res.status(201).json(fileDetail);
  } catch (error) {
    await transaction.rollback();
    console.error("Error in addItemToFile:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Update updateFileItem method
exports.updateFileItem = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      assessableQuantity,
      assessableValue,
      declaredQuantity,
      declaredValue,
      isCustomDutySelected,
      isFtaCustomDutySelected,
      customDuty,
      ftaCustomDuty,
      acd,
      rd,
      salesTax,
      additionalSalesTax,
      furtherTax,
      incomeTaxImport,
      incomeTaxWithheld,
      remarks
    } = req.body;

    // Find the file detail
    const fileDetail = await FileDetail.findByPk(id, {
      transaction,
      include: [{ model: TaxInfo }]
    });

    if (!fileDetail) {
      await transaction.rollback();
      return res.status(404).json({ error: "File detail not found" });
    }

    // Handle boolean fields for mutually exclusive options
    if (isCustomDutySelected !== undefined) {
      fileDetail.isCustomDutySelected = isCustomDutySelected;
      if (isCustomDutySelected === true) {
        fileDetail.isFtaCustomDutySelected = false;
      }
    }
    
    if (isFtaCustomDutySelected !== undefined) {
      fileDetail.isFtaCustomDutySelected = isFtaCustomDutySelected;
      if (isFtaCustomDutySelected === true) {
        fileDetail.isCustomDutySelected = false;
      }
    }

    // Update other fields if provided
    if (assessableQuantity !== undefined) fileDetail.assessableQuantity = assessableQuantity;
    if (assessableValue !== undefined) fileDetail.assessableValue = assessableValue;
    if (declaredQuantity !== undefined) fileDetail.declaredQuantity = declaredQuantity;
    if (declaredValue !== undefined) fileDetail.declaredValue = declaredValue;
    if (customDuty !== undefined) fileDetail.customDuty = customDuty;
    if (ftaCustomDuty !== undefined) fileDetail.ftaCustomDuty = ftaCustomDuty;
    if (acd !== undefined) fileDetail.acd = acd;
    if (rd !== undefined) fileDetail.rd = rd;
    if (salesTax !== undefined) fileDetail.salesTax = salesTax;
    if (additionalSalesTax !== undefined) fileDetail.additionalSalesTax = additionalSalesTax;
    if (furtherTax !== undefined) fileDetail.furtherTax = furtherTax;
    if (incomeTaxImport !== undefined) fileDetail.incomeTaxImport = incomeTaxImport;
    if (incomeTaxWithheld !== undefined) fileDetail.incomeTaxWithheld = incomeTaxWithheld;
    if (remarks !== undefined) fileDetail.remarks = remarks;

    // Recalculate totals if quantities or values changed
    if (assessableQuantity !== undefined || assessableValue !== undefined) {
      fileDetail.totalAssessableValue = fileDetail.assessableQuantity * fileDetail.assessableValue;
    }

    // Recalculate declared value if tax rates or assessable value changed
    const customDutyRate = fileDetail.isCustomDutySelected ? parseFloat(fileDetail.customDuty || 0) : 0;
    const ftaCustomDutyRate = fileDetail.isFtaCustomDutySelected ? parseFloat(fileDetail.ftaCustomDuty || 0) : 0;
    
    if ([
      'assessableValue', 'customDuty', 'acd', 'rd', 'ftaCustomDuty', 
      'salesTax', 'additionalSalesTax', 'furtherTax', 
      'incomeTaxImport', 'incomeTaxWithheld',
      'isCustomDutySelected', 'isFtaCustomDutySelected'
    ].some(field => req.body[field] !== undefined) && declaredValue === undefined) {
      
      const newDeclaredValue = fileDetail.assessableValue * (
        customDutyRate + 
        ftaCustomDutyRate + 
        parseFloat(fileDetail.acd || 0) + 
        parseFloat(fileDetail.rd || 0) + 
        parseFloat(fileDetail.salesTax || 0) + 
        parseFloat(fileDetail.additionalSalesTax || 0) + 
        parseFloat(fileDetail.furtherTax || 0) + 
        parseFloat(fileDetail.incomeTaxImport || 0) + 
        parseFloat(fileDetail.incomeTaxWithheld || 0)
      ) / 100;
      
      fileDetail.declaredValue = newDeclaredValue;
    }

    // Recalculate total declared value if declared quantity or declared value changed
    if (declaredQuantity !== undefined || declaredValue !== undefined || 
        (assessableValue !== undefined && declaredValue === undefined)) {
      fileDetail.totalDeclaredValue = fileDetail.declaredQuantity * fileDetail.declaredValue;
    }

    // Recalculate grand total
    fileDetail.total = fileDetail.totalAssessableValue + fileDetail.totalDeclaredValue;

    await fileDetail.save({ transaction });
    await transaction.commit();

    return res.status(200).json(fileDetail);
  } catch (error) {
    await transaction.rollback();
    console.error("Error in updateFileItem:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};












// Remove item from file
exports.removeItemFromFile = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    const fileDetail = await FileDetail.findByPk(id, { transaction });
    if (!fileDetail) {
      await transaction.rollback();
      return res.status(404).json({ error: "File detail not found" });
    }

    await fileDetail.destroy({ transaction });
    await transaction.commit();

    return res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    console.error("Error in removeItemFromFile:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Get a single file detail
exports.getFileDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const fileDetail = await FileDetail.findByPk(id, {
      include: [
        { model: TaxInfo, include: [{ model: Unit }] },
        { model: FileHeader }
      ]
    });

    if (!fileDetail) {
      return res.status(404).json({ error: "File detail not found" });
    }

    return res.status(200).json(fileDetail);
  } catch (error) {
    console.error("Error in getFileDetailById:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
};
