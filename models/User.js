const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async findAll() {
    try {
      var result = await knex
        .select(["id", "name", "email", "role"])
        .table("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      var result = await knex
        .select(["id", "name", "email", "role"])
        .where({ id: id })
        .table("users");

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async new(user) {
    const { email, password, name } = user;

    try {
      let passwordString = password.toString();
      await bcrypt.hash(passwordString, 10, async (error, hash) => {
        if (error) {
          console.log("Deu este erro" + error);
        } else {
          await knex
            .insert({ email, password: hash, name, role: 0 })
            .table("users");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findEmail(email) {
    try {
      const result = await knex
        .select("*")
        .table("users")
        .where({ email: email });

      console.log(result);

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new User();
