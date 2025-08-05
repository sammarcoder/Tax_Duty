// models/fileDetail.model.js
  const { DataTypes } = require('sequelize');
  const sequelize = require('../config/database');

  const FileDetail = sequelize.define('FileDetail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fileHeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'file_headers',
        key: 'id'
      }
    },
    taxInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tax_information',
        key: 'id'
      }
    },
    // First quantity field renamed to assessableQuantity
    assessableQuantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 1.00
    },
    // Assessable value
    assessableValue: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false
    },
    // Total assessable value (assessableQuantity * assessableValue)
    totalAssessableValue: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      defaultValue: 0.0000
    },
    // Renamed from dutyQuantity to declaredQuantity
    declaredQuantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 1.00
    },
    // Renamed from dutyValue to declaredValue
    declaredValue: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      defaultValue: 0.0000
    },
    // Renamed from totalDutyValue to totalDeclaredValue
    totalDeclaredValue: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      defaultValue: 0.0000
    },
    // Grand total field
    total: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      defaultValue: 0.0000
    },
    // Tax rates - can override defaults from TaxInfo
    // Include all TaxInfo fields
    hsCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    uomCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    // Added isCustomDutySelected boolean
    isCustomDutySelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    customDuty: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    // Added isFtaCustomDutySelected boolean
    isFtaCustomDutySelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    ftaCustomDuty: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    acd: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    rd: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    salesTax: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    additionalSalesTax: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    furtherTax: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    incomeTaxImport: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    incomeTaxWithheld: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'file_details',
    timestamps: true
  });

  module.exports = FileDetail;
