import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import Teams from './teamsModel';
import Matches from './matchesModel';
import Users from './usersModel';

export default new Sequelize(config);
export { Teams, Matches, Users };
