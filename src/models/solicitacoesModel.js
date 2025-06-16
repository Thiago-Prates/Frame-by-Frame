var database = require("../database/config")

function exibirsolicitacoes(idempresa) {

    var instrucaoSql = `
    select * from usuario join empresa 
    on idEmpresa = fkEmpresa
    where permissao = 0 and idEmpresa = ${idempresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function aceitar(idusuario) {

    var instrucaoSql = `    
    update usuario set permissao = 1 where idUsuario = ${idusuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recusar(idusuario) {

    var instrucaoSql = `    
    delete from usuario where idUsuario = ${idusuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    exibirsolicitacoes,
    aceitar,
    recusar,
};