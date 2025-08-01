// const UOM = require('../models/uom.model'); // Adjust path to your model file

// // POST: Create a new UOM record
// exports.createUOM = async (req, res) => {
//     try {
//         const { itemName, itemCode } = req.body;

//         // Basic validation (itemCode is optional but will use default if not provided)
//         if (itemCode !== undefined && isNaN(parseFloat(itemCode))) {
//             return res.status(400).json({ message: "Invalid itemCode: must be a valid decimal." });
//         }

//         const newUOM = await UOM.create({
//             itemName,
//             itemCode: itemCode !== undefined ? parseFloat(itemCode) : undefined  // Parse to float; model default applies if undefined
//         });

//         res.status(201).json(newUOM);
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(400).json({ message: "ItemCode must be unique." });
//         }
//         console.error("❌ Error in createUOM:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// // GET: Retrieve all UOM records (or by ID if needed)
// exports.getUOM = async (req, res) => {
//     try {
//         const { id } = req.params; // Optional: if id is provided, get single record

//         if (id) {
//             const uom = await UOM.findByPk(id);
//             if (!uom) {
//                 return res.status(404).json({ message: "UOM record not found." });
//             }
//             return res.status(200).json(uom);
//         }

//         const uoms = await UOM.findAll();
//         res.status(200).json(uoms);
//     } catch (error) {
//         console.error("❌ Error in getUOM:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// // PUT: Update a UOM record by ID (full replacement)
// exports.updateUOM = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { itemName, itemCode } = req.body;

//         // Validate ID
//         if (!id || isNaN(id)) {
//             return res.status(400).json({ message: "Valid ID is required." });
//         }

//         // Find the record
//         const uom = await UOM.findByPk(id);
//         if (!uom) {
//             return res.status(404).json({ message: "UOM record not found." });
//         }

//         // Update fields if provided
//         const updatedData = {};
//         if (itemName !== undefined) updatedData.itemName = itemName;
//         if (itemCode !== undefined) {
//             if (isNaN(parseFloat(itemCode))) {
//                 return res.status(400).json({ message: "Invalid itemCode: must be a valid decimal." });
//             }
//             updatedData.itemCode = parseFloat(itemCode);
//         }

//         await uom.update(updatedData);
//         res.status(200).json(uom);
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(400).json({ message: "ItemCode must be unique." });
//         }
//         console.error("❌ Error in updateUOM:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// // DELETE: Delete a UOM record by ID (itemCode of other rows remains unchanged)
// exports.deleteUOM = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ID
//         if (!id || isNaN(id)) {
//             return res.status(400).json({ message: "Valid ID is required." });
//         }

//         // Find and delete the record
//         const deletedCount = await UOM.destroy({
//             where: { id: parseInt(id) }
//         });

//         if (deletedCount === 0) {
//             return res.status(404).json({ message: "UOM record not found." });
//         }

//         res.status(200).json({ message: "UOM record deleted successfully. ItemCodes of remaining rows are unchanged." });
//     } catch (error) {
//         console.error("❌ Error in deleteUOM:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };














































// POST: Create a new UOM record (itemCode is optional, unique if provided, no default)
// exports.createUOM = async (req, res) => {
//     try {
//         // const { itemName, itemCode } = req.body;

//         const user = UOM.create(itemName ='pencil ', itemCode = 2.20)
//         res.status(200).json(user)

//     } catch (err) {
//         res.status(500).json({ 'erorr': err.message })
//     }
// };




const UOM = require('../models/uom.model'); // Make sure path is correct

// POST: Create a new UOM record
exports.createUOM = async (req, res) => {
    try {
        const { itemName, itemCode } = req.body;

        const newUOM = await UOM.create({ itemName, itemCode });

        res.status(201).json(newUOM);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// GET: Retrieve all UOM records (or by ID if needed)
// exports.getUOM = async (req, res) => {
//     const uom = UOM.create(req.body)
//    res.status(200).send({message: uom.itemName  })
// };

// // PUT: Update a UOM record by ID (full replacement)
// exports.updateUOM = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { itemName, itemCode } = req.body;

//         // Validate ID
//         if (!id || isNaN(id)) {
//             return res.status(400).json({ message: "Valid ID is required." });
//         }

//         // Find the record
//         const uom = await UOM.findByPk(id);
//         if (!uom) {
//             return res.status(404).json({ message: "UOM record not found." });
//         }

//         // Update fields if provided
//         const updatedData = {};
//         if (itemName !== undefined) updatedData.itemName = itemName;
//         if (itemCode !== undefined) {
//             if (itemCode !== null && isNaN(parseFloat(itemCode))) {
//                 return res.status(400).json({ message: "Invalid itemCode: must be a valid decimal or null." });
//             }
//             updatedData.itemCode = itemCode !== null ? parseFloat(itemCode) : null;  // Allow null updates (no default)
//         }

//         await uom.update(updatedData);
//         res.status(200).json(uom);
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(400).json({ message: "ItemCode must be unique." });
//         }
//         console.error("❌ Error in updateUOM:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// // DELETE: Delete a UOM record by ID (itemCode of other rows remains unchanged)
// exports.deleteUOM = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ID
//         if (!id || isNaN(id)) {
//             return res.status(400).json({ message: "Valid ID is required." });
//         }

//         // Find and delete the record
//         const deletedCount = await UOM.destroy({
//             where: { id: parseInt(id) }
//         });

//         if (deletedCount === 0) {
//             return res.status(404).json({ message: "UOM record not found." });
//         }

//         res.status(200).json({ message: "UOM record deleted successfully. ItemCodes of remaining rows are unchanged." });
//     } catch (error) {
//         console.error("❌ Error in deleteUOM:", error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };
