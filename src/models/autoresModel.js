var database = require("../database/config");

function listar() {
    
    var instrucaoSql = `
        SELECT 
            * 
        FROM autor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome) {
    
    var instrucaoSql = `
        INSERT INTO autor (nome) VALUES ('${nome}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    cadastrar
}
