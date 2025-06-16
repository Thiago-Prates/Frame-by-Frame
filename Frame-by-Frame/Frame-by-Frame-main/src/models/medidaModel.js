var database = require("../database/config");


function inserirarduino(randLuminosidade) {
    
    var instrucaoSql = `Insert into medidas (luminosidade, fkEstudio) values
                        ('${randLuminosidade}', 1);`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function buscarUltimasMedidas() {

    var instrucaoSql = `SELECT luminosidade FROM medidas
                    ORDER BY idmedidas DESC LIMIT 7`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {

    var instrucaoSql = `SELECT luminosidade FROM medidas
                    ORDER BY idmedidas DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    inserirarduino
}
