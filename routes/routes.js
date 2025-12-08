const express = require("express");
const app = express();
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.get("/", HomeController.index);

router.get("/users", AdminAuth, UserController.index);

router.get("/user/:id", AdminAuth, UserController.findUser);

router.post("/user", UserController.create);

router.put("/user", AdminAuth, UserController.edit);

router.delete("/user/:id", AdminAuth, UserController.remove);

router.post("/recoverpassword", UserController.recoverPassword);

router.post("/changepassword", UserController.changePassword);

router.post("/login", UserController.login);

router.post("/validate", AdminAuth, HomeController.validate);

module.exports = router;
