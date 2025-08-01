// models/masterFile.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MasterFile = sequelize.define('MasterFile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileNumber: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  importerName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'master_files',
  timestamps: true,
});

module.exports = MasterFile;
