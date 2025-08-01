// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Unit = sequelize.define(
//   'Unit',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     unit: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//       validate: {
//         notEmpty: { msg: 'Unit cannot be empty' },
//       },
//     },
//     uomCode: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//       unique: true,
//     },
//     serialNumber: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     tableName: 'units',
//     timestamps: true,
//     hooks: {
//       beforeValidate: async (instance) => {
//         if (instance.unit) {
//           instance.unit = instance.unit.trim();
//         }

//         // Only generate if not provided
//         if (!instance.uomCode || !instance.serialNumber) {
//           const lastUnit = await Unit.findOne({
//             order: [['serialNumber', 'DESC']],
//           });

//           let nextNumber = 1;
//           if (lastUnit && lastUnit.serialNumber) {
//             nextNumber = lastUnit.serialNumber + 1;
//           }

//           instance.serialNumber = instance.serialNumber || nextNumber;
//           instance.uomCode = instance.uomCode || `U_${String(nextNumber).padStart(4, '0')}`;
//         }
//       },
//     },
//   }
// );

// module.exports = Unit;


















































// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Unit = sequelize.define(
//   'Unit',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     unit: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//       validate: {
//         notEmpty: { msg: 'Unit cannot be empty' },
//       },
//     },
//     uomCode: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//       unique: true,
//     },
//     serialNumber: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     tableName: 'units',
//     timestamps: true,
//     hooks: {
//       beforeValidate: async (instance) => {
//         if (instance.unit) {
//           instance.unit = instance.unit.trim();
//         }

//         // Only generate if not provided
//         if (!instance.uomCode || !instance.serialNumber) {
//           const lastUnit = await Unit.findOne({
//             order: [['serialNumber', 'DESC']],
//           });

//           let nextNumber = 1;
//           if (lastUnit && lastUnit.serialNumber) {
//             nextNumber = lastUnit.serialNumber + 1;
//           }

//           instance.serialNumber = instance.serialNumber || nextNumber;
//           instance.uomCode = instance.uomCode || `U_${String(nextNumber).padStart(4, '0')}`;
//         }
//       },
//     },
//   }
// );

// module.exports = Unit;





















const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Unit = sequelize.define(
  'Unit',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Unit cannot be empty' },
      },
    },
    uomCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    serialNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'units',
    timestamps: true,
    hooks: {
      beforeValidate: async (instance) => {
        if (instance.unit) {
          instance.unit = instance.unit.trim();
        }

        // Only generate if not provided
        if (!instance.uomCode || !instance.serialNumber) {
          const lastUnit = await Unit.findOne({
            order: [['serialNumber', 'DESC']],
          });

          let nextNumber = 1;
          if (lastUnit && lastUnit.serialNumber) {
            nextNumber = lastUnit.serialNumber + 1;
          }

          // Set serial number
          instance.serialNumber = instance.serialNumber || nextNumber;
          
          // Check for unique uomCode (FIX HERE)
          if (!instance.uomCode) {
            let isUnique = false;
            let attemptCode;
            let counter = nextNumber;
            
            // Keep trying until we find a unique code
            while (!isUnique) {
              attemptCode = `U_${String(counter).padStart(4, '0')}`;
              
              // Check if this code already exists
              const existingUnit = await Unit.findOne({
                where: { uomCode: attemptCode }
              });
              
              if (!existingUnit) {
                isUnique = true;
              } else {
                counter++; // Try next number
              }
            }
            
            instance.uomCode = attemptCode;
          }
        }
      },
    },
  }
);

module.exports = Unit;
