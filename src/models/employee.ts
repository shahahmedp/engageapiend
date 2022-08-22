'use strict';

import {Model, UUIDV4} from 'sequelize';
interface EmployeeAttributes{
    id?: number;
    firstName: string;
    lastName: string;
    cmpID:string
    email: string;
    phone: number;
 
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Employee extends Model<EmployeeAttributes>
  implements EmployeeAttributes {
    //preferedName!: String | null;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;
     firstName!: string;
     lastName!: string;
     cmpID!:string
     email!: string;
     phone!: number;
    static associate(models: any) {
      // define association here
      Employee.belongsToMany(models.companies,{
        through: 'companyem'
      })
    }
  }
  Employee.init({
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    cmpID: {
      type: DataTypes.STRING,
      allowNull: false
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'employee',
  });
  return Employee;
};