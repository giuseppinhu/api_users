const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async findAll() {
    try {
      const result = await knex
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
      const result = await knex
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

  async findByEmail(email) {
    try {
      const result = await knex
        .select(["id", "name", "email", "password", "role"])
        .where({ email })
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

  async update(id, email, name, role) {
    const user = await this.findById(id);

    if (user != undefined) {
      const editUser = {};

      if (email != undefined) {
        if (email != user.email || email == user.email) {
          const result = await this.findEmail(email);

          if (!result) {
            editUser.email = email;
          } else {
            return { status: false, error: "O email já foi cadastrado." };
          }
        }
      }

      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await knex.update(editUser).where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false };
      }
    } else {
      return { status: false, error: "O usuário não existe." };
    }
  }

  async delete(id) {
    const user = await this.findById(id);

    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (error) {
        return { status: false, error: error };
      }
    } else {
      return { status: false, error: "O usuário não existe." };
    }
  }

  async changePassword(newPassword, id, token) {
    const PasswordToken = require("../models/PasswordToken");

    try {
      await bcrypt.hash(newPassword, 10, async (error, hash) => {
        if (error) {
          console.log("Deu este erro" + error);
        } else {
          await knex
            .update({
              password: hash,
            })
            .where({ id: id })
            .table("users");

          await PasswordToken.setUsed(token);
        }
      });
    } catch (error) {}
  }
}

module.exports = new User();
