'use strict';
import {
  Model
} from 'sequelize';
interface RoleAttributes{
  id: number,
  role: String,
  status:String
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Role extends Model<RoleAttributes> 
  implements RoleAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    role!:String;
    status!:String;
    static associate(models:any) {
      // define association here
      Role.belongsToMany(models.user,{
        through: 'userrole'
      })
    }
  }
  Role.init({
    id:{
      type: DataTypes.BIGINT,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    status:{
      type:DataTypes.STRING,
      allowNull:false
    }
}, {
    sequelize,
    modelName: 'role',
  });
  return Role;
};