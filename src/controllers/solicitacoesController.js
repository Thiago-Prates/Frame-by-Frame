var solicitacoesModel = require("../models/solicitacoesModel");

function exibirsolicitacoes(req, res) {
  var idempresa = req.params.idEmpresa;

  solicitacoesModel.exibirsolicitacoes(idempresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
    exibirsolicitacoes,
};