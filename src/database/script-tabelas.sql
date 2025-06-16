create database FrameByFrame;
use FrameByFrame;
drop database FrameByFrame;

create table empresa (
idEmpresa int primary key auto_increment,
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
nivel tinyint,
foreign key (fkEmpresa) references empresa(idEmpresa));

create table estudio (
idEstudio int primary key auto_increment,
nome_estudio varchar(50),
fkEmpresa int,
foreign key (fkEmpresa) references empresa(idEmpresa));


create table medidas (
idmedidas int primary key auto_increment,
luminosidade int,
fkEstudio int,
foreign key (fkEstudio) references estudio(idEstudio));

CREATE TABLE alerta (
idAlerta INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(45),
fk_medias INT,
FOREIGN KEY (fk_medidas) REFERENCES medidas(idMedidas)
);