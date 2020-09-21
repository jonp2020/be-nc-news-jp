
exports.up = function(knex) {
  return knex.schema.createTable('comments', (commentsTable) =>{
      commentsTable.increments('comment_id')
      commentsTable.string('author').references('users.username')
      commentsTable.integer('votes')
      commentsTable.timestamp('created_at')
      commentsTable.string('body')
  }) 

  
};

exports.down = function(knex) {
    console.log('comments table dropped')
    return knex.schema.dropTable('comments')

};
