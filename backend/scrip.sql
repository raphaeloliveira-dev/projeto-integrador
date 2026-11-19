
CREATE DATABASE IF NOT EXISTS projeto_integrador;
USE projeto_integrador;

CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consulta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS nota_fiscal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_nota TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS carrinho_de_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

UPDATE produto
SET nome = 'Camiseta Básica Preta',
    descricao = 'Camiseta básica preta.',
    preco = 79.90
WHERE nome = 'Camiseta Sustentável';

UPDATE produto
SET nome = 'Camiseta Básica Branca',
    descricao = 'Camiseta básica branca.',
    preco = 79.90
WHERE nome = 'Moletom Ecológico';

UPDATE produto
SET nome = 'Bermuda Linho Verde',
    descricao = 'Bermuda de linho verde.',
    preco = 89.90
WHERE nome = 'Short Reciclado';

UPDATE produto
SET nome = 'Bermuda Linho Azul',
    descricao = 'Bermuda de linho azul.'
WHERE nome = 'Bermuda Linho Preta';

INSERT INTO produto (nome, descricao, preco, quantidade)
SELECT 'Camiseta Básica Azul', 'Camiseta básica azul.', 79.90, 20
WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Camiseta Básica Azul');

INSERT INTO produto (nome, descricao, preco, quantidade)
SELECT 'Bermuda Linho Azul', 'Bermuda de linho azul.', 89.90, 25
WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Bermuda Linho Azul');

INSERT INTO produto (nome, descricao, preco, quantidade)
SELECT 'Bermuda Linho Branca', 'Bermuda de linho branca.', 89.90, 25
WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Bermuda Linho Branca');

SHOW TABLES;

SELECT * FROM cliente;
SELECT * FROM cadastro;
SELECT * FROM produto;
SELECT * FROM consulta;
SELECT * FROM login;
SELECT * FROM compra;
SELECT * FROM venda;
SELECT * FROM nota_fiscal;
SELECT * FROM carrinho_de_compra;
