exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary().unique();
    usersTable.string("avatar_url");
    usersTable.string("name");
  });
};

exports.down = function (knex) {
  // console.log('users table dropped')
  return knex.schema.dropTable("users");
};
