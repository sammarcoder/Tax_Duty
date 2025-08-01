// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const FileHeader = sequelize.define('FileHeader', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   fileNumber: {
//     type: DataTypes.STRING(25),
//     allowNull: false,
//     unique: true
//   },
//   exchangeRate: {
//     type: DataTypes.DECIMAL(10, 4),
//     allowNull: false
//   },
//   valueAdditionRate: { // For the 1.1% value
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: false,
//     defaultValue: 1.1
//   },
//   currency: {
//     type: DataTypes.STRING(3),
//     allowNull: false
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, {
//   tableName: 'file_headers',
//   timestamps: true
// });

// module.exports = FileHeader;































// models/fileHeader.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FileHeader = sequelize.define('FileHeader', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fileName:{
    type:DataTypes.STRING(25),
    allowNull: false,
    unique:true
  },
  fileNumber: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true
  },
  landedCost:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  exchangeRate: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  valueAdditionRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 1.1
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false
  }
}, {
  tableName: 'file_headers',
  timestamps: true
});

module.exports = FileHeader;
