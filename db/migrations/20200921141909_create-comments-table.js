exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id");
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references('articles.article_id')
    commentsTable.integer("votes").notNull().defaultTo(0);
    commentsTable.timestamp("created_at");
    commentsTable.string("body");
  });
};

exports.down = function (knex) {
  console.log("comments table dropped");
  return knex.schema.dropTable("comments");
};
