"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//const sequelize = new Sequelize('mysql://Admin:Bd@admin123@localhost:3306/pitu');
const sequelize = new sequelize_1.Sequelize({
    database: 'pitu',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'Bd@admin123',
    dialect: 'mysql'
});
exports.default = sequelize;
