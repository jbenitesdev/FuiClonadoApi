module.exports = app => {
    const numeroClonado = require("../controllers/numeroClonado.controller");
      
    app.post("/numeroClonado", numeroClonado.create);
    app.get("/numeroClonado/:numero", numeroClonado.findNumber);
};
  