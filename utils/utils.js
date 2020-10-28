const jwt = require('jsonwebtoken')
const db = require('../db/connection')

module.exports = {
    salvarRegistro: (req, res, next) => {
        let post = req.body

        let titulo = post.titulo;
        let descricao = post.descricao;
        let imagem = post.imagem;

        let nome = post.nome;
        let cpf = post.cpf;
        let numero = post.numero;
        let email = post.email; 
        let termo = post.termo;

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let query = `insert into numerosClonados (nome,cpf,numero,email,termo) values ('${nome}','${cpf}','${numero}','${email}','${termo}')`;
                db.execSQLQuery().query(query, function (error, results, fields) {
                    if (error)
                        res.json(error);
                    else
                        res.json(results);

                });
                db.execSQLQuery().end();
            }
        })

        console.log("VALOR DE RES: ", res)
    },
    verificarNumero: (req, res, next) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // let query = "select * from numerosClonados";
                let query = `select * from numerosClonados where numero = '${numero}'`;
                db.execSQLQuery().query(query, function (error, results, fields) {
                    if (error)
                        res.json(error);
                    else {

                        res.json(results);
                    }
                    db.execSQLQuery().end();
                });

            }
        })

        console.log("VALOR DE RES: ", res)
    },
}