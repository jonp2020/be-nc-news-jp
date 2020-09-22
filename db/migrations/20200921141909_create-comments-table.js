exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id");
    commentsTable.string("created_by").references("users.username");
    commentsTable.integer("votes").notNull().defaultTo(0);
    commentsTable.string("belongs_to");
    commentsTable.timestamp("created_at");
    commentsTable.string("body");
  });
};

exports.down = function (knex) {
  console.log("comments table dropped");
  return knex.schema.dropTable("comments");
};
