const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const {createTimeStamp} = require('../utils/data-manipulation')

exports.seed = function (knex) {
  return knex.migrate.rollback()
  .then(()=> {
   return knex.migrate.latest()
  })
  .then(()=>{
   return knex('topics').insert(topicData).returning('*')
  })
  .then(()=>{
   return knex('users').insert(userData).returning('*')
  })
  .then(()=> {
   const articlesWithAdaptedTimeStamp = createTimeStamp(articleData)
   return knex.insert(articlesWithAdaptedTimeStamp).into('articles').returning('*')
  })
  .catch(err => {
   console.log(err)
  }) 
};
