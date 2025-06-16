    create database FrameByFrame;
    use FrameByFrame;""

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


    INSERT INTO empresa (razao_social, cnpj, codigoAcesso) VALUES
    ('LumiTech Monitoramento LTDA', '12345678000190', 'LUMI1234'),
    ('FotoSensor Pro Serviços', '23456789000101', 'FSENSOR2024'),
    ('StudioBright Sistemas', '34567890000112', 'STB4567'),
    ('LightTrack Soluções', '45678901000123', 'LT2025MON'),
    ('ClariView Tecnologia', '56789012000134', 'CLARIV2025'),
    ('ViewFlash TechStar', '12345678912458', 'LUAS7YQ20P');

    insert into estudio (nome_estudio,fkEmpresa) VALUES
    ('FlashBack', 1);

