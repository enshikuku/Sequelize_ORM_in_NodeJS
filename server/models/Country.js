import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
});

export default Country;
