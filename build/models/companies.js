'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Companies extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Companies.belongsToMany(models.employee, {
                through: 'companyem',
            });
        }
    }
    Companies.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //unique:true
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, website: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'companies',
    });
    return Companies;
};
