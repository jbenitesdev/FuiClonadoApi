const jwt = require('jsonwebtoken')
const db = require('../db/connection')

module.exports = {
    salvarRegistro: (req, res, next) => {
        let post = req.body;
        let nome = post.nome;
        let cpf = post.cpf;
        let numero = post.numero;
        let email = post.email; 
        let termo = post.termo;
        let status = 0
        let result

        let query = `insert into numerosClonados (nome,cpf,numero,email,termo) values ('${nome}','${cpf}','${numero}','${email}','${termo}')`;
        result = db.execSQLQuery().query(query);
        db.execSQLQuery().end();
        return result
    },
    verificarNumero: (req, res, next) => {
        let query = `select * from numerosClonados where numero = '${numero}'`;
        db.execSQLQuery().query(query, function (error, results, fields) {
            if (error)
                res.json(error);
            else {
                res.json(results);
            }
            db.execSQLQuery().end();
        });
    },
}