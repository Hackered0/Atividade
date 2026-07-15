var express = require("express");
var router = express.Router();

var autoresController = require("../controllers/autoresController");

router.get("/listar", function (req, res) {
    autoresController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    autoresController.cadastrar(req, res);
});

module.exports = router;