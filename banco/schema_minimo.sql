-- ATENÇÃO: versão mínima só para rodar os Models da Sprint 3.
-- Substitua pelo DDL oficial do grupo (Sprint 2) e ajuste os nomes de colunas nos Models.
CREATE DATABASE IF NOT EXISTS projeto_integrador;
USE projeto_integrador;

CREATE TABLE IF NOT EXISTS cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(120) NOT NULL UNIQUE,
  telefone   VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS carrinho_de_compra (
  id_carrinho    INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente     INT NOT NULL,
  produto        VARCHAR(100) NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  quantidade     INT NOT NULL CHECK (quantidade > 0),
  CONSTRAINT fk_carrinho_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);
