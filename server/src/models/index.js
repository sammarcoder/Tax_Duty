// // models/index.js

// // Import all models
// const FileHeader = require('./fileHeader.model');
// const FileDetail = require('./fileDetail.model');
// const TaxInfo = require('./taxInfo.model');
// const Unit = require('./unit.model');

// // Define FileHeader and FileDetail associations
// FileHeader.hasMany(FileDetail, {
//   foreignKey: 'fileHeaderId',
//   as: 'details'
// });
// FileDetail.belongsTo(FileHeader, {
//   foreignKey: 'fileHeaderId'
// });

// // Define TaxInfo and FileDetail associations
// TaxInfo.hasMany(FileDetail, {
//   foreignKey: 'taxInfoId',
//   as: 'fileEntries'
// });
// FileDetail.belongsTo(TaxInfo, {
//   foreignKey: 'taxInfoId'
// });

// // Keep existing Unit and TaxInfo associations
// TaxInfo.belongsTo(Unit, {
//   foreignKey: 'uomCode',
//   targetKey: 'uomCode',
//   onDelete: 'RESTRICT',
//   onUpdate: 'CASCADE'
// });
// Unit.hasMany(TaxInfo, {
//   foreignKey: 'uomCode',
//   sourceKey: 'uomCode'
// });

// // Export all models
// module.exports = {
//   FileHeader,
//   FileDetail,
//   TaxInfo,
//   Unit
// };































// // models/index.js
// const FileHeader = require('./fileHeader.model');
// const FileDetail = require('./fileDetail.model');
// const TaxInfo = require('./taxInfo.model');
// const Unit = require('./unit.model');

// // FileHeader to FileDetail relationship (one-to-many)
// FileHeader.hasMany(FileDetail, {
//   foreignKey: 'fileHeaderId',
//   as: 'details'
// });
// FileDetail.belongsTo(FileHeader, {
//   foreignKey: 'fileHeaderId'
// });

// // TaxInfo to FileDetail relationship (one-to-many)
// TaxInfo.hasMany(FileDetail, {
//   foreignKey: 'taxInfoId',
//   as: 'fileEntries'
// });
// FileDetail.belongsTo(TaxInfo, {
//   foreignKey: 'taxInfoId'
// });

// // Unit to TaxInfo relationship (already defined in TaxInfo model)
// Unit.hasMany(TaxInfo, {
//   foreignKey: 'uomCode',
//   sourceKey: 'uomCode'
// });

// module.exports = {
//   FileHeader,
//   FileDetail,
//   TaxInfo,
//   Unit
// };

























// models/index.js
const FileHeader = require('./fileHeader.model');
const FileDetail = require('./fileDetail.model');
const TaxInfo = require('./taxInfo.model');
const Unit = require('./unit.model');
const sequelize = require('../config/database');

// FileHeader and FileDetail relationship
FileHeader.hasMany(FileDetail, {
  foreignKey: 'fileHeaderId',
  as: 'details'
});
FileDetail.belongsTo(FileHeader, {
  foreignKey: 'fileHeaderId'
});

// TaxInfo and FileDetail relationship
TaxInfo.hasMany(FileDetail, {
  foreignKey: 'taxInfoId',
  as: 'fileEntries'
});
FileDetail.belongsTo(TaxInfo, {
  foreignKey: 'taxInfoId'
});

// Unit and TaxInfo relationship
TaxInfo.belongsTo(Unit, {
  foreignKey: 'uomCode',
  targetKey: 'uomCode',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});
Unit.hasMany(TaxInfo, {
  foreignKey: 'uomCode',
  sourceKey: 'uomCode'
});

// Export models and sequelize instance
const db = {
  FileHeader,
  FileDetail, 
  TaxInfo,
  Unit,
  sequelize
};

module.exports = db;
