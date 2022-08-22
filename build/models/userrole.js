'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRole extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    UserRole.init({
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'userrole',
    });
    return UserRole;
};
