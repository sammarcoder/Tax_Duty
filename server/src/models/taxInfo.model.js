// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const TaxInfo = sequelize.define('TaxInfo', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     hsCode: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     itemName: {
//         type: DataTypes.STRING(30),
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     uomCode:{
//         type: DataTypes.STRING(30),
//         allowNull: false,

//     },
//     // unitOfMeasurement: {
//     //     type: DataTypes.STRING,
//     //     allowNull: false,
//     //     validate: {
//     //         notEmpty: true
//     //     }
//     // },
//     assessableValue: {
//         type: DataTypes.DECIMAL(10, 4),
//         allowNull: false,
//         validate: {
//             isDecimal: true
//         }
//     },
//     customDuty: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     acd: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     rd: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     ftaCustomDuty: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     salesTax: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     additionalSalesTax: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     furtherTax: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     incomeTaxImport: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     },
//     incomeTaxWithheld: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,
//         defaultValue: 0.00  // Added default
//     }
// }, {
//     tableName: 'tax_information',
//     timestamps: true
// });

// module.exports = TaxInfo;

















































// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Unit = require('./unit.model');

// const TaxInfo = sequelize.define('TaxInfo', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   // Add this to your TaxInfo model definition (in the columns list):

//   // Add this to the TaxInfo model definition fields
//   // fileDetailId: {
//   //   type: DataTypes.INTEGER,
//   //   allowNull: true
//   // },


//   hsCode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   itemName: {
//     type: DataTypes.STRING(30),
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   uomCode: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//       async isValidUomCode(value) {
//         const unit = await Unit.findOne({ where: { uomCode: value } });
//         if (!unit) {
//           throw new Error('Invalid uomCode: Must reference an existing unit');
//         }
//       }
//     }
//   },
//   assessableValue: {
//     type: DataTypes.DECIMAL(10, 4),
//     allowNull: false,
//     validate: {
//       isDecimal: true
//     }
//   },
//   customDuty: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   acd: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   rd: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   ftaCustomDuty: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   salesTax: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   additionalSalesTax: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   furtherTax: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   incomeTaxImport: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   },
//   incomeTaxWithheld: {
//     type: DataTypes.DECIMAL(5, 2),
//     allowNull: true,
//     defaultValue: 0.00
//   }
// }, {
//   tableName: 'tax_information',
//   timestamps: true
// });

// // Association for join (to fetch unit name with tax info)
// // TaxInfo.belongsTo(Unit, {
// //   foreignKey: 'uomCode',
// //   targetKey: 'uomCode',
// //   onDelete: 'RESTRICT',
// //   onUpdate: 'CASCADE'
// // });
// // Unit.hasMany(TaxInfo, {
// //   foreignKey: 'uomCode',
// //   sourceKey: 'uomCode'
// // });

// module.exports = TaxInfo;






































// models/taxInfo.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Unit = require('./unit.model');

const TaxInfo = sequelize.define('TaxInfo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  // Remove fileDetailId - we're changing the relationship direction
  // fileDetailId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true
  // },
  hsCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  itemName: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  uomCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      async isValidUomCode(value) {
        const unit = await Unit.findOne({ where: { uomCode: value } });
        if (!unit) {
          throw new Error('Invalid uomCode: Must reference an existing unit');
        }
      }
    }
  },
  assessableValue: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  customDuty: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  acd: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  rd: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  ftaCustomDuty: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  salesTax: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  additionalSalesTax: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  furtherTax: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  incomeTaxImport: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  incomeTaxWithheld: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0.00
  }
}, {
  tableName: 'tax_information',
  timestamps: true
});

// Keep only this association in the model file
TaxInfo.belongsTo(Unit, {
  foreignKey: 'uomCode',
  targetKey: 'uomCode',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

module.exports = TaxInfo;
