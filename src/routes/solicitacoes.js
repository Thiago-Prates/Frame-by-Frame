var express = require("express");
var router = express.Router();

var solicitacoesController = require("../controllers/solicitacoesController");

router.get("/exibirsolicitacoes/:idEmpresa", function (req, res) {
    solicitacoesController.exibirsolicitacoes(req, res);
});

module.exports = router;