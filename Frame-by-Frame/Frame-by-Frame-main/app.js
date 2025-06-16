 var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");
var solicitacoesRouter = require("./src/routes/solicitacoes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);
app.use("/solicitacoes", solicitacoesRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http:${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});


// Importa bibliotecas necessárias
const serialport = require('serialport');
const mysql = require('mysql2');

// Constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// Habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// Função para comunicação serial - adaptada para sensor de luminosidade
const serial = async (valoresSensorLuminosidade) => {
    // Conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool({
        host: '127.0.0.1',
        user: 'aluno',
        password: 'sptech',
        database: 'FrameByFrame',
        port: 3306
    }).promise();

    // Lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // Configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort({
        path: portaArduino.path,
        baudRate: SERIAL_BAUD_RATE
    });

    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // Pipe para ler linhas da serial e processar dados
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log("Dado recebido: ", data);

        // Supondo que o sensor envie um único valor de luminosidade (ex: "450")
        const luminosidade = parseFloat(data);
        const dtregistro = new Date();

        if (isNaN(luminosidade)) {
            console.warn("Valor recebido não é um número válido:", data);
            return;
        }

        // Armazena no array local
        valoresSensorLuminosidade.push(luminosidade);

        if (HABILITAR_OPERACAO_INSERIR) {
            const fkEstudio = 1; // Ajuste conforme o id do sensor no banco
            await poolBancoDados.execute(
                "INSERT INTO medidas (luminosidade, fkEstudio) VALUES (?, ?)",
                [luminosidade, fkEstudio]
            );
            console.log("Valor de luminosidade inserido no banco:", luminosidade);
        }
    });

    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`);
    });
}

// Servidor web adaptado para luminosidade
const servidor = (valoresLuminosidade) => {
    const app = express();

    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Endpoint para obter os valores de luminosidade
    app.get('/sensor/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    });
}

(async () => {
    const valoresLuminosidade = [];

    await serial(valoresLuminosidade);
    servidor(valoresLuminosidade);
})();

