import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Country from './Country.js';

const User = sequelize.define('User', {
    name: DataTypes.STRING,
});

User.belongsTo(Country, { foreignKey: 'countryId' });

export default User;
