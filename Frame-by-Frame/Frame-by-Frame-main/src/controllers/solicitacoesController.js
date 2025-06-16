var solicitacoesModel = require("../models/solicitacoesModel");

function exibirsolicitacoes(req, res) {
  var idempresa = req.params.idEmpresa;

  solicitacoesModel.exibirsolicitacoes(idempresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function aceitar(req, res) {
	var idusuario = req.body.idUsuario;

	solicitacoesModel.aceitar(idusuario).then((resultado) => {
		res.status(201).json(resultado);
	});
}

function recusar(req, res) {
	var idusuario = req.body.idUsuario;

	solicitacoesModel.recusar(idusuario).then((resultado) => {
		res.status(201).json(resultado);
	});
}

module.exports = {
  exibirsolicitacoes,
  aceitar,
  recusar,
};