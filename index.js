const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const cors = require("cors");

const router = require("./routes/routes");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log("Servidor rodando na porta: http://localhost:8080");
});
