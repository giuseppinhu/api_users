const User = require("../models/User");

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
}

module.exports = new UserController();
