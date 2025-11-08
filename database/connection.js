var knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "150725",
    database: "users_api",
  },
});

module.exports = knex;
