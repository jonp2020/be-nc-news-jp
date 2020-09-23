const knex = require('../../db/seeds/connection')

exports.fetchTopics = () => {
return knex.select('*').from('topics')
}