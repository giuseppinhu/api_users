var knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "0rb36i.h.filess.io",
    port: "61002",
    user: "user_api_steeplaid",
    password: "1fc2484121aac6776779fe36a098ba0dfb187273",
    database: "user_api_steeplaid",
  },
});

module.exports = knex;
