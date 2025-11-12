const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");

class UserController {
  async index(req, res) {
    var users = await User.findAll();
    res.json(users);
  }

  async findUser(req, res) {
    var id = req.params.id;
    var user = await User.findById(id);
    if (user == undefined) {
      res.status(404);
      res.json({ error: "O id não foi encontrado." });
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async create(req, res) {
    const { email, password, name } = req.body;

    // Validate if undefined
    if (email === undefined) {
      res.status(403);
      res.json({ error: "O e-mail é inválido!" });
      return;
    }
    if (password === undefined) {
      res.status(403);
      res.json({ error: "A senha é inválida!" });
      return;
    }
    if (name === undefined) {
      res.status(403);
      res.json({ error: "O campo nome é inválido!" });
      return;
    }

    // Validate if email exist in DB
    var emailExits = await User.findEmail(email);

    if (emailExits) {
      res.status(406);
      res.json({ error: "O email já cadastrado." });
      return;
    }

    // Create a new User
    await User.new(req.body);

    res.status(200);
    res.json("OK!");
  }

  async edit(req, res) {
    const { id, name, email, role } = req.body;

    const result = await User.update(id, email, name, role);

    if (result != undefined) {
      if (result.status) {
        res.json({ sucess: "Tudo OK!" });
      } else {
        res.status(406);
        res.json({ error: result.error });
      }
    }
  }

  async remove(req, res) {
    var id = req.params.id;

    var result = await User.delete(id);

    if (result != undefined) {
      if (result.status) {
        res.status(200);
        res.json({ sucess: "Tudo OK!" });
      } else {
        res.status(406);
        res.json({ error: result.error });
      }
    }
  }

  async recoverPassword(req, res) {
    const email = req.body.email;

    const result = await PasswordToken.create(email);

    if (result.status) {
      res.json({ sucess: `Token: ${result.token}` });
    } else {
      res.status(406);
      res.json({ error: result.error });
    }
  }

  async changePassword(req, res) {
    const { token, password } = req.body;

    const isTokenIsValid = await PasswordToken.validate(token);

    if (isTokenIsValid.status) {
      await User.changePassword(
        password,
        isTokenIsValid.token.user_id,
        isTokenIsValid.token.token
      );
      res.json({ sucess: "Senha alterada!" });
    } else {
      res.status(406);
      res.json({ error: "Token Inválido" });
    }
  }
}

module.exports = new UserController();
