create database FrameByFrame;
use FrameByFrame;
drop database FrameByFrame;

create table empresa 
(idEmpresa int primary key auto_increment,
razao_social varchar(50),
cnpj char(14),	
codigoAcesso varchar(50));

create table usuario 
(idUsuario int primary key auto_increment,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(50),
cpf char(11),
permissao tinyint,
fkEmpresa int,
nivel int,
constraint chkNivel check (nivel = 0 or 1),
foreign key (fkEmpresa) references empresa(idEmpresa));

CREATE TABLE alerta (
idAlerta INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100),
descricao VARCHAR(150),
fk_usuario INT,
FOREIGN KEY (fk_usuario) REFERENCES usuario(idUsuario)
);


create table estudio 
(idEstudio int primary key auto_increment,
nome_estudio varchar(50),
fkEmpresa int,
foreign key (fkEmpresa) references empresa(idEmpresa));


create table fotometro 
(idFotometro int primary key auto_increment,
luminosidade int,
temperaturaCor int,
tipoLuz varchar(45),
ModificadoresLuz varchar(45),
fkEstudio int,
foreign key (fkEstudio) references estudio(idEstudio));



