// const config = require("../knexfile");
// const knex = require("knex")(config);

// module.exports = knex;

const ENV = process.env.NODE_ENV || 'development';
const knex = require('knex');

const dbConfig =
	ENV === 'production'
		? { client: 'pg', connection: process.env.DATABASE_URL }
		: require('../knexfile');

module.exports = knex(dbConfig);