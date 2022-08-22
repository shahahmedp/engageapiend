'use strict';

import {Model, UUIDV4} from 'sequelize';
interface UserAttributes{
  id: String,
  userName: String,
  email: String,
  password: String,
  //preferedName: String| null
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes {
    //preferedName!: String | null;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: String;
     userName!: String;
     email!: String;
     password!: String;
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.role,{
        through: 'userrole'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};