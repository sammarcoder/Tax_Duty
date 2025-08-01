// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const UOM = sequelize.define('UOM', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     itemName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     itemCode: {
//         type: DataTypes.DECIMAL(5, 2),
//         allowNull: true,

//         unique: true 
//     }
// }, {
//     tableName: 'UOM_value',
//     timestamps: true
// });

// module.exports = UOM;

































const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UOM = sequelize.define('UOM', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    itemCode: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        unique: true  // Ensures uniqueness (no duplicates allowed)
        // No defaultValue - removed as per request
    }

}, {
    tableName: 'uom_value',
    timestamps: true
});

module.exports = UOM;
