module.exports = app => {
    const twilioApi = require("../controllers/twilioApi.controller");
      
    app.post("/verifyNumber", twilioApi.verifyBySMS);
    app.post("/checkCodeNumber", twilioApi.checkSMSCode)
};