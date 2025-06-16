var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/arduino/:luminosidade", function (req, res) {
    medidaController.arduino(req, res);
});

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;