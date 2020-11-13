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
  sql.query(`SELECT * FROM numerosClonados WHERE numero LIKE '%${numero}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: 500, msg: "Numero não encontrado"});
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

NumeroClonado.deleteByNumber = (numero, result) => {
  sql.query(`SELECT * FROM numerosClonados WHERE numero LIKE '%${numero}%' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: 500, msg: "Numero não encontrado"});
      return;
    }

    if (res.length) {
      sql.query(`DELETE FROM numerosClonados WHERE id =${res[0].id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, { status: 500, msg: "ID não encontrado"});
          return;
        }
      
        console.log("RES NA DELEÇÃO: ", res)
        if (res.length) {
          console.log("Deletou: ", res[0]);
          result(null, { status: 200, msg: `O número: ${numero} foi recuperado`, ...res[0]});
          return;
        }
  
        result({ kind: "not_found" }, null);
      }); 
    }
  });
};

module.exports = NumeroClonado;
