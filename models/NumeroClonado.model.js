const sql = require("./db");

const NumeroClonado  = function(numeroClonado) {
    this.id = numeroClonado.id;
    this.nome = numeroClonado.nome;
    this.cpf = numeroClonado.cpf;
    this.numero = numeroClonado.numero;
    this.email = numeroClonado.email;
    this.termo = numeroClonado.termo;
}

NumeroClonado.create = (novoNumeroClonado, result) => {
    let query = `INSERT INTO numerosClonados (nome,cpf,numero,email,termo) VALUES ('${novoNumeroClonado.nome}','${novoNumeroClonado.cpf}','${novoNumeroClonado.numero}','${novoNumeroClonado.email}','${novoNumeroClonado.termo}')`;
    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("Novo Numero Clonado cadastrado: ", { id: res.insertId, ...novoNumeroClonado });
        result(null, { id: res.insertId, status: 200, ...novoNumeroClonado });
    });        
}

NumeroClonado.findByNumber = (numero, result) => {
  sql.query(`SELECT * FROM numerosClonados WHERE numero = '${numero}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Número encontrado: ", res[0]);
      result(null, { status: 200, ...res[0]});
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = NumeroClonado;
