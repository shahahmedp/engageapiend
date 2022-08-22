'use strict';
import {
  Model
} from  'sequelize';

interface UserRoleAttribute{
  roleId: number;
  userId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserRole extends Model<UserRoleAttribute> 
  implements UserRoleAttribute{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    roleId!: number;
    userId!:string;
    static associate(models: any) {
      // define association here
    }
  }
  UserRole.init({
    roleId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId:{
      type:DataTypes.STRING,
      allowNull:false
    }

  }, {
    sequelize,
    modelName: 'userrole',
  });
  return UserRole;
};