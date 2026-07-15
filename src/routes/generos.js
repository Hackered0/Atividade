var express = require("express");
var router = express.Router();

var generosController = require("../controllers/generosController");

router.get("/listar", function (req, res) {
    generosController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    generosController.cadastrar(req, res);
});

module.exports = router;