// const TaxInfo = require('../models/taxInfo.model');

// exports.createTaxInfo = async (req, res) => {
//     try {
//         const {
//             hsCode, itemName,uomCode,assessableValue,
//             customDuty, acd, rd, ftaCustomDuty, salesTax,
//             additionalSalesTax, furtherTax, incomeTaxImport, incomeTaxWithheld
//         } = req.body;

//         // Basic validation (expanded to include unitOfMeasurement)
//         if (!hsCode || !itemName || !assessableValue) {
//             return res.status(400).json({ message: "Missing required fields: hsCode, itemName and assessableValue are required." });
//         }

//         // Parse decimal fields to floats (handles strings like '0.00'; model's defaultValue covers missing/empty)
//         const parsedData = {
//             hsCode,
//             itemName,
//             uomCode,
//             // unitOfMeasurement,
//             assessableValue: parseFloat(assessableValue),
//             customDuty: customDuty ? parseFloat(customDuty) : undefined,
//             acd: acd ? parseFloat(acd) : undefined,
//             rd: rd ? parseFloat(rd) : undefined,
//             ftaCustomDuty: ftaCustomDuty ? parseFloat(ftaCustomDuty) : undefined,
//             salesTax: salesTax ? parseFloat(salesTax) : undefined,
//             additionalSalesTax: additionalSalesTax ? parseFloat(additionalSalesTax) : undefined,
//             furtherTax: furtherTax ? parseFloat(furtherTax) : undefined,
//             incomeTaxImport: incomeTaxImport ? parseFloat(incomeTaxImport) : undefined,
//             incomeTaxWithheld: incomeTaxWithheld ? parseFloat(incomeTaxWithheld) : undefined
//         };

//         const newTaxInfo = await TaxInfo.create(parsedData);
//         res.status(201).json(newTaxInfo);

//     } catch (error) {
//         console.error("❌ Error in createTaxInfo:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };




















// // @desc    Get all tax information records
// // @route   GET /api/taxinfo
// exports.getAllTaxInfo = async (req, res) => {
//     try {
//         const allTaxInfo = await TaxInfo.findAll({
//             order: [['createdAt', 'DESC']] // Show newest first
//         });
//         res.status(200).json(allTaxInfo);
//     } catch (error) {
//         console.error("❌ Error in getAllTaxInfo:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };











// // @desc    Get a single tax information record by ID
// // @route   GET /api/taxinfo/:id
// exports.getTaxInfoById = async (req, res) => {
//     try {
//         const taxInfo = await TaxInfo.findByPk(req.params.id);

//         if (!taxInfo) {
//             return res.status(404).json({ message: "Record not found" });
//         }

//         res.status(200).json(taxInfo);
//     } catch (error) {
//         console.error("❌ Error in getTaxInfoById:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// // @desc    Update a tax information record
// // @route   PUT /api/taxinfo/:id
// exports.updateTaxInfo = async (req, res) => {
//     try {
//         const taxInfo = await TaxInfo.findByPk(req.params.id);

//         if (!taxInfo) {
//             return res.status(404).json({ message: "Record not found" });
//         }

//         const updatedTaxInfo = await taxInfo.update(req.body);
//         res.status(200).json(updatedTaxInfo);

//     } catch (error) {
//         console.error("❌ Error in updateTaxInfo:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// // Delete a tax information record
// // DELETE /api/taxinfo/:id
// exports.deleteTaxInfo = async (req, res) => {
//     try {
//         const taxInfo = await TaxInfo.findByPk(req.params.id);

//         if (!taxInfo) {
//             return res.status(404).json({ message: "Record not found" });
//         }

//         await taxInfo.destroy();
//         res.status(204).send(); // 204 No Content is standard for a successful delete

//     } catch (error) {
//         console.error("❌ Error in deleteTaxInfo:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

























































const TaxInfo = require('../models/taxInfo.model');
const Unit = require('../models/unit.model');

exports.createTaxInfo = async (req, res) => {
  try {
    const { hsCode, itemName, uomCode, assessableValue, customDuty, acd, rd, ftaCustomDuty, salesTax, additionalSalesTax, furtherTax, incomeTaxImport, incomeTaxWithheld } = req.body;
    if (!hsCode || !itemName || !uomCode || !assessableValue) return res.status(400).json({ message: "Missing required fields: hsCode, itemName, uomCode, and assessableValue are required." });
    const unitExists = await Unit.findOne({ where: { uomCode } });
    if (!unitExists) return res.status(400).json({ message: "Invalid uomCode: Must reference an existing unit." });
    const parsedData = {
      hsCode, itemName, uomCode, assessableValue: parseFloat(assessableValue),
      customDuty: customDuty ? parseFloat(customDuty) : undefined, acd: acd ? parseFloat(acd) : undefined,
      rd: rd ? parseFloat(rd) : undefined, ftaCustomDuty: ftaCustomDuty ? parseFloat(ftaCustomDuty) : undefined,
      salesTax: salesTax ? parseFloat(salesTax) : undefined, additionalSalesTax: additionalSalesTax ? parseFloat(additionalSalesTax) : undefined,
      furtherTax: furtherTax ? parseFloat(furtherTax) : undefined, incomeTaxImport: incomeTaxImport ? parseFloat(incomeTaxImport) : undefined,
      incomeTaxWithheld: incomeTaxWithheld ? parseFloat(incomeTaxWithheld) : undefined
    };
    const newTaxInfo = await TaxInfo.create(parsedData);
    res.status(201).json(newTaxInfo);
  } catch (error) {
    console.error("❌ Error in createTaxInfo:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllTaxInfo = async (req, res) => {
  try {
    const allTaxInfo = await TaxInfo.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: Unit, attributes: ['unit'] }] // Join to include unit name
    });
    res.status(200).json(allTaxInfo);
  } catch (error) {
    console.error("❌ Error in getAllTaxInfo:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getTaxInfoById = async (req, res) => {
  try {
    const taxInfo = await TaxInfo.findByPk(req.params.id, {
      include: [{ model: Unit, attributes: ['unit'] }]
    });
    if (!taxInfo) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(taxInfo);
  } catch (error) {
    console.error("❌ Error in getTaxInfoById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateTaxInfo = async (req, res) => {
  try {
    const taxInfo = await TaxInfo.findByPk(req.params.id);
    if (!taxInfo) return res.status(404).json({ message: "Record not found" });
    if (req.body.uomCode) {
      const unitExists = await Unit.findOne({ where: { uomCode: req.body.uomCode } });
      if (!unitExists) return res.status(400).json({ message: "Invalid uomCode: Must reference an existing unit." });
    }
    const parsedBody = { ...req.body };
    // Parse decimals if updating [[2]]
    if (parsedBody.assessableValue) parsedBody.assessableValue = parseFloat(parsedBody.assessableValue);
    if (parsedBody.customDuty) parsedBody.customDuty = parseFloat(parsedBody.customDuty);
    // ... similarly for other decimal fields
    const updatedTaxInfo = await taxInfo.update(parsedBody);
    res.status(200).json(updatedTaxInfo);
  } catch (error) {
    console.error("❌ Error in updateTaxInfo:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteTaxInfo = async (req, res) => {
  try {
    const taxInfo = await TaxInfo.findByPk(req.params.id);
    if (!taxInfo) return res.status(404).json({ message: "Record not found" });
    await taxInfo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error in deleteTaxInfo:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
