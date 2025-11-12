require("dotenv").config();

const jwt = require("jsonwebtoken");

const AdminAuth = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.json({ error: "Você não tem permissão!" });
        return;
      }
    } catch (error) {
      res.status(403);
      res.json({ error: "Não foi possivel se autenticar!" });
      return;
    }
  } else {
    res.status(403);
    res.json({ error: "Não foi possivel se autenticar!" });
  }
};

module.exports = AdminAuth;
