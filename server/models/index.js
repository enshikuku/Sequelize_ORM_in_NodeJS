import sequelize from '../config/db.js';
import Country from './Country.js';
import User from './User.js';

// Ensure tables are created
await sequelize.sync();

export { sequelize, Country, User };
