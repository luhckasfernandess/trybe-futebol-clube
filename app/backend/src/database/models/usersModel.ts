import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public userName: string;
  public role: string;
  public email: string;
  public password: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: STRING(10),
    allowNull: false,
  },
  role: {
    type: STRING(10),
    allowNull: false,
  },
  email: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
