const MasterFile = require('../models/masterFile.model');
const FileDetail = require('../models/fileDetail.model');
const TaxInfo = require('../models/taxInfo.model');

exports.getMasterFileWithDetails = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await MasterFile.findByPk(fileId, {
      include: {
        model: FileDetail,
        include: [TaxInfo]
      }
    });

    if (!file) return res.status(404).json({ message: "File not found" });

    return res.status(200).json(file);
  } catch (error) {
    console.error("getMasterFileWithDetails error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
