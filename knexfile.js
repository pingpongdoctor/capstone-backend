require("dotenv").config();
const { user, password, database, host } = process.env;
// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql",
  connection: {
    host,
    database,
    user,
    password,
  },
};
