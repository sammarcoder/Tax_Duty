// Update addItemToFile in fileDetail.controller.js
// exports.addItemToFile = async (req, res) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const fileHeaderId = req.params.id;
//     const {
//       taxInfoId,
//       itemName,
//       assessableQuantity = 1,
//       assessableValue,
//       declaredQuantity,
//       declaredValue,
//       isCustomDutySelected = true,
//       isFtaCustomDutySelected = false,
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

//     // Use declaredQuantity or default to assessableQuantity
//     const finalDeclaredQuantity = declaredQuantity || assessableQuantity;

//     // Calculate values
//     const aValue = assessableValue || taxInfo.assessableValue;
//     const totalAssessableValue = assessableQuantity * aValue;

//     // Get tax rates (from request or from taxInfo)
//     const isCustomSelected = isCustomDutySelected !== undefined ? isCustomDutySelected : true;
//     const isFtaCustomSelected = isFtaCustomDutySelected !== undefined ? isFtaCustomDutySelected : false;
    
//     const cDuty = isCustomSelected ? (customDuty !== undefined ? customDuty : taxInfo.customDuty) : 0;
//     const ftaValue = isFtaCustomSelected ? (ftaCustomDuty !== undefined ? ftaCustomDuty : taxInfo.ftaCustomDuty) : 0;
    
//     const acdValue = acd !== undefined ? acd : taxInfo.acd;
//     const rdValue = rd !== undefined ? rd : taxInfo.rd;
//     const salesTaxValue = salesTax !== undefined ? salesTax : taxInfo.salesTax;
//     const addSalesTaxValue = additionalSalesTax !== undefined ? additionalSalesTax : taxInfo.additionalSalesTax;
//     const furtherTaxValue = furtherTax !== undefined ? furtherTax : taxInfo.furtherTax;
//     const incomeTaxImpValue = incomeTaxImport !== undefined ? incomeTaxImport : taxInfo.incomeTaxImport;
//     const incomeTaxWithValue = incomeTaxWithheld !== undefined ? incomeTaxWithheld : taxInfo.incomeTaxWithheld;

//     // Calculate declared value
//     const dValue = declaredValue || (aValue *
//       (cDuty + ftaValue + acdValue + rdValue + salesTaxValue +
//        addSalesTaxValue + furtherTaxValue + incomeTaxImpValue +
//        incomeTaxWithValue) / 100);

//     const totalDeclaredValue = finalDeclaredQuantity * dValue;
    
//     // Calculate grand total
//     const total = totalAssessableValue + totalDeclaredValue;

//     // Create file detail
//     const fileDetail = await FileDetail.create({
//       fileHeaderId: fileHeader.id,
//       taxInfoId: taxInfo.id,
//       assessableQuantity,
//       assessableValue: aValue,
//       totalAssessableValue,
//       declaredQuantity: finalDeclaredQuantity,
//       declaredValue: dValue,
//       totalDeclaredValue,
//       total,
//       hsCode: taxInfo.hsCode,
//       itemName: taxInfo.itemName,
//       uomCode: taxInfo.uomCode,
//       isCustomDutySelected: isCustomSelected,
//       isFtaCustomDutySelected: isFtaCustomSelected,
//       customDuty: cDuty,
//       ftaCustomDuty: ftaValue,
//       acd: acdValue,
//       rd: rdValue,
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



// At the top of your fileDetail.controller.js
const db = require('../models');
const { FileDetail, TaxInfo, FileHeader } = db;  // Add this line to properly import models



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
      isCustomDutySelected,      // Remove default values here
      isFtaCustomDutySelected,   // Remove default values here  
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

    // ✅ FIXED: Use the values sent from frontend, or use model defaults
    // Convert to explicit Boolean and use model defaults if undefined
    const isCustomSelected = isCustomDutySelected !== undefined ? Boolean(isCustomDutySelected) : false;  // Model default
    const isFtaCustomSelected = isFtaCustomDutySelected !== undefined ? Boolean(isFtaCustomDutySelected) : true;   // Model default
    
    // Ensure mutual exclusivity - at least one must be true
    let finalIsCustomSelected = isCustomSelected;
    let finalIsFtaCustomSelected = isFtaCustomSelected;
    
    // If both are true or both are false, use defaults
    if (finalIsCustomSelected === finalIsFtaCustomSelected) {
      finalIsCustomSelected = false;
      finalIsFtaCustomSelected = true;
    }
    
    const cDuty = finalIsCustomSelected ? (customDuty !== undefined ? customDuty : taxInfo.customDuty) : 0;
    const ftaValue = finalIsFtaCustomSelected ? (ftaCustomDuty !== undefined ? ftaCustomDuty : taxInfo.ftaCustomDuty) : 0;
    
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
      isCustomDutySelected: finalIsCustomSelected,    // Use the normalized values
      isFtaCustomDutySelected: finalIsFtaCustomSelected, // Use the normalized values
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
// exports.updateFileItem = async (req, res) => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const {
//       assessableQuantity,
//       assessableValue,
//       declaredQuantity,
//       declaredValue,
//       isCustomDutySelected,
//       isFtaCustomDutySelected,
//       customDuty,
//       ftaCustomDuty,
//       acd,
//       rd,
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

//     // Handle boolean fields for mutually exclusive options
//     if (isCustomDutySelected !== undefined) {
//       fileDetail.isCustomDutySelected = isCustomDutySelected;
//       if (isCustomDutySelected === true) {
//         fileDetail.isFtaCustomDutySelected = false;
//       }
//     }
    
//     if (isFtaCustomDutySelected !== undefined) {
//       fileDetail.isFtaCustomDutySelected = isFtaCustomDutySelected;
//       if (isFtaCustomDutySelected === true) {
//         fileDetail.isCustomDutySelected = false;
//       }
//     }

//     // Update other fields if provided
//     if (assessableQuantity !== undefined) fileDetail.assessableQuantity = assessableQuantity;
//     if (assessableValue !== undefined) fileDetail.assessableValue = assessableValue;
//     if (declaredQuantity !== undefined) fileDetail.declaredQuantity = declaredQuantity;
//     if (declaredValue !== undefined) fileDetail.declaredValue = declaredValue;
//     if (customDuty !== undefined) fileDetail.customDuty = customDuty;
//     if (ftaCustomDuty !== undefined) fileDetail.ftaCustomDuty = ftaCustomDuty;
//     if (acd !== undefined) fileDetail.acd = acd;
//     if (rd !== undefined) fileDetail.rd = rd;
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

//     // Recalculate declared value if tax rates or assessable value changed
//     const customDutyRate = fileDetail.isCustomDutySelected ? parseFloat(fileDetail.customDuty || 0) : 0;
//     const ftaCustomDutyRate = fileDetail.isFtaCustomDutySelected ? parseFloat(fileDetail.ftaCustomDuty || 0) : 0;
    
//     if ([
//       'assessableValue', 'customDuty', 'acd', 'rd', 'ftaCustomDuty', 
//       'salesTax', 'additionalSalesTax', 'furtherTax', 
//       'incomeTaxImport', 'incomeTaxWithheld',
//       'isCustomDutySelected', 'isFtaCustomDutySelected'
//     ].some(field => req.body[field] !== undefined) && declaredValue === undefined) {
      
//       const newDeclaredValue = fileDetail.assessableValue * (
//         customDutyRate + 
//         ftaCustomDutyRate + 
//         parseFloat(fileDetail.acd || 0) + 
//         parseFloat(fileDetail.rd || 0) + 
//         parseFloat(fileDetail.salesTax || 0) + 
//         parseFloat(fileDetail.additionalSalesTax || 0) + 
//         parseFloat(fileDetail.furtherTax || 0) + 
//         parseFloat(fileDetail.incomeTaxImport || 0) + 
//         parseFloat(fileDetail.incomeTaxWithheld || 0)
//       ) / 100;
      
//       fileDetail.declaredValue = newDeclaredValue;
//     }

//     // Recalculate total declared value if declared quantity or declared value changed
//     if (declaredQuantity !== undefined || declaredValue !== undefined || 
//         (assessableValue !== undefined && declaredValue === undefined)) {
//       fileDetail.totalDeclaredValue = fileDetail.declaredQuantity * fileDetail.declaredValue;
//     }

//     // Recalculate grand total
//     fileDetail.total = fileDetail.totalAssessableValue + fileDetail.totalDeclaredValue;

//     await fileDetail.save({ transaction });
//     await transaction.commit();

//     return res.status(200).json(fileDetail);
//   } catch (error) {
//     await transaction.rollback();
//     console.error("Error in updateFileItem:", error);
//     return res.status(500).json({ error: "Internal server error", message: error.message });
//   }
// };



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

    // ✅ FIXED: Handle boolean fields properly with explicit Boolean conversion
    if (isCustomDutySelected !== undefined) {
      fileDetail.isCustomDutySelected = Boolean(isCustomDutySelected);
      if (fileDetail.isCustomDutySelected === true) {
        fileDetail.isFtaCustomDutySelected = false;
      }
    }
    
    if (isFtaCustomDutySelected !== undefined) {
      fileDetail.isFtaCustomDutySelected = Boolean(isFtaCustomDutySelected);
      if (fileDetail.isFtaCustomDutySelected === true) {
        fileDetail.isCustomDutySelected = false;
      }
    }
    
    // ✅ NEW: Safety check to handle the case where both flags might be the same
    if (fileDetail.isCustomDutySelected === fileDetail.isFtaCustomDutySelected) {
      fileDetail.isCustomDutySelected = false;
      fileDetail.isFtaCustomDutySelected = true;
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

    if (declaredQuantity !== undefined || declaredValue !== undefined) {
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
