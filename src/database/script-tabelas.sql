-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

CREATE DATABASE livrariaRecuperacao20262;

USE livrariaRecuperacao20262;

CREATE TABLE autor (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50)
);

CREATE TABLE genero (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50)
);

CREATE TABLE livro (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(50),
    fkAutor INT,
    fkGenero INT,
    precoCompra DOUBLE,
    precoVenda DOUBLE,
    estoque DOUBLE,
    CONSTRAINT fk_livro_autor FOREIGN KEY (fkAutor) REFERENCES autor(id),
    CONSTRAINT fk_livro_genero FOREIGN KEY (fkGenero) REFERENCES genero(id)
);

INSERT INTO genero (nome) VALUE
       ('romance'),
       ('fantasia'),
       ('poesia'),
       ('horror');

   /*    SELECT 
    l.id,
    l.titulo,
    a.nome AS autor,
    g.nome AS genero,
    l.precoCompra,
    l.precoVenda AS precoVendaOriginal,
    CASE 
        WHEN l.precoCompra >= 100 AND g.nome IN ('horror', 'romance') 
        THEN ROUND(l.precoCompra * 0.225 ,2)
        ELSE l.precoVenda 
    END AS precoVendaCalculado
FROM livro l
JOIN genero g ON l.fkGenero = g.id
JOIN autor a ON l.fkAutor = a.id;

SELECT 
    l.id,
    l.titulo,
    a.nome AS autor,
    g.nome AS genero,
    l.precoCompra,
    l.precoVenda AS precoVendaOriginal,
    CASE 
        WHEN l.precoCompra <= 50 AND g.nome IN ('poesia', 'horror') 
        THEN ROUND(l.precoCompra * 0.25, 2)
        ELSE l.precoVenda 
    END AS precoVendaCalculado
FROM livro l
JOIN genero g ON l.fkGenero = g.id
JOIN autor a ON l.fkAutor = a.id;

SELECT 
    l.id,
    l.titulo,
    a.nome AS autor,
    g.nome AS genero,
    l.precoCompra,
    l.precoVenda AS precoVendaOriginal,
    CASE 
        WHEN (l.precoCompra > 50 AND l.precoCompra < 100) AND g.nome IN ('fantasia') 
        THEN ROUND(l.precoCompra * 0.275, 2)
        ELSE l.precoVenda 
    END AS precoVendaCalculado
FROM livro l
JOIN genero g ON l.fkGenero = g.id
JOIN autor a ON l.fkAutor = a.id;
*/
-- primeira kpi
SELECT g.nome, 
    SUM(livro.estoque) 
FROM livro AS livro 
JOIN genero AS g ON g.id = livro.fkGenero
GROUP BY g.nome;

-- Quantidade de livro por quantidade 
SELECT g.nome, 
    COUNT(livro.id) 
FROM livro AS livro 
JOIN genero AS g ON g.id = livro.fkGenero
GROUP BY g.nome;

-- Autores caros
SELECT 
autor.nome,
    SUM(livro.precoCompra) AS total_gasto
FROM livro AS livro 
JOIN autor AS autor ON autor.id = livro.fkAutor
GROUP BY autor.nome
ORDER BY total_gasto DESC;