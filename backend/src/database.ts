import {Sequelize} from 'sequelize';

//const sequelize = new Sequelize('mysql://Admin:Bd@admin123@localhost:3306/pitu');
const sequelize = new Sequelize({
  database: 'pitu',
  host:'localhost',
  port: 3306,
  username: 'admin',
  password: 'Bd@admin123',
  dialect: 'mysql'
})

export default sequelize;