
exports.up = function(knex) {

return knex.schema.createTable('topics', (topicsTable)=>{
    topicsTable.string('slug').primary();
    topicsTable.string('description');

})
  
};

exports.down = function(knex) {
    console.log('dropping table')
    return knex.schema.dropTable('topics')
};
