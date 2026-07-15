var livrosModel = require("../models/livrosModel");

function listar(req, res) {
    livrosModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function cadastrar(req, res) {
    var titulo = req.body.titulo;
    var fkGenero = req.body.fkGenero;
    var fkAutor = req.body.fkAutor;
    var precoCompra = req.body.precoCompra;
    var precoVenda = req.body.precoVenda;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (fkAutor == undefined) {
        res.status(400).send("O autor está indefinido!");
    } else if (precoCompra == undefined) {
        res.status(400).send("O preço de compra está indefinido!");
    } else if (precoVenda == undefined) {
        res.status(400).send("O preço de venda está indefinido!");
    } else if (fkGenero == undefined) {
        res.status(400).send("O gênero está indefinido!");
    } else {
        livrosModel.cadastrar(titulo, fkAutor, fkGenero, precoCompra, precoVenda)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novoPrecoCompra = req.body.precoCompra;
    var novoPrecoVenda = req.body.precoVenda;
    var idLivro = req.params.idLivro;

    livrosModel.editar(novoPrecoCompra, novoPrecoVenda, idLivro)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idLivro = req.params.idLivro;

    livrosModel.deletar(idLivro)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    cadastrar,
    editar,
    deletar
}