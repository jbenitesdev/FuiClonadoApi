const NumeroClonado = require("../models/NumeroClonado.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Objeto não pode ser vazio!"
    });
  }

  const numeroClonado = new NumeroClonado({
    nome: req.body.nome,
    cpf: req.body.cpf,
    numero: req.body.numero,
    email: req.body.email,
    termo: req.body.termo,
  });

  NumeroClonado.create(numeroClonado, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao criar registro de número clonado."
      });
    else res.send(data);
  });
};

exports.findNumber = (req, res) => {
  NumeroClonado.findByNumber(req.params.numero, (err, data) => {
    if (err)
      res.send({status: 500, msg: "Número não encontrado"})
    // res.status(500).send({
    //   message: `Erro ao procurar o número ${req.params.numero}.`
    // });        
    else res.send(data);
  });
};