import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;
  public teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  tableName: 'teams',
});

export default Teams;
