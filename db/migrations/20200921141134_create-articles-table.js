exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id");
    articlesTable.string("title");
    articlesTable.text("body");
    articlesTable.integer("votes").notNull().defaultTo(0);
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at");
  });
};

exports.down = function (knex) {
  console.log("articles table dropped");
  return knex.schema.dropTable("articles");
};