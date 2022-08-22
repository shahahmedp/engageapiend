'use strict';

import {Model, UUIDV4} from 'sequelize';
interface CompaniesAttributes{
    id?: number;
    name: string;
    email: string;
    phone: number;
    website: string;
 
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Companies extends Model<CompaniesAttributes>
  implements CompaniesAttributes {
    //preferedName!: String | null;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;
    name!: string;
    email!: string;
    phone!: number;
    website!: string;
    static associate(models: any) {
      // define association here
      Companies.belongsToMany(models.employee,{
        through: 'companyem',
        })
    }
  }
  Companies.init({
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
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
      allowNull:false
    },website: {
      type: DataTypes.STRING,
      allowNull: false
      },
  }, {
    sequelize,
    modelName: 'companies',
  });
  return Companies;
};