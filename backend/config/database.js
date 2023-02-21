const config = require('./index');

const db = config.db;
const jwtConfig = config.jwtConfig
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
const jwtSecret = jwtConfig.secret;

console.log(process.env.NODE_ENV)

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    jwtSecret,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {         // define schema here
      schema: process.env.SCHEMA
    } //it is here
  },
};
   // "build": "npm run build --prefix backend"