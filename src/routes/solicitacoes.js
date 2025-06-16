var express = require("express");
var router = express.Router();

var solicitacoesController = require("../controllers/solicitacoesController");

router.get("/exibirsolicitacoes/:idEmpresa", function (req, res) {
    solicitacoesController.exibirsolicitacoes(req, res);
});

router.post("/aceitar", function (req, res) {
    solicitacoesController.aceitar(req, res);
})

router.get("/logar/:email/:senha", function (req, res) {
    solicitacoesController.logar(req, res);
})

module.exports = router;