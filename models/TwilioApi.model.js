const Twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const TwilioApi  = function(twilioApi) {
    this.phoneNumber = twilioApi.phoneNumber;
    this.code = twilioApi.code;
}

TwilioApi.verify = (twilioApi, result) => {
    Twilio.verify.services(process.env.SERVICE_ID).verifications.create({
        to: twilioApi.phoneNumber, channel: process.env.TWILIO_CHANNEL
    }).then((data) => {
        let resp = { to: data.to, status: data.status, valid: data.valid }
        result(null, { data: resp, status: 200, msg: "Sucesso ao enviar código!" });
    })
}

TwilioApi.check = (twilioApi, result) => {
    console.log("Verificando o código: ", twilioApi)
    Twilio.verify.services(process.env.SERVICE_ID).verificationChecks.create({
        to: twilioApi.phoneNumber, code: twilioApi.code
    }).then((data) => {
        console.log("Código Verificado!");
        let resp = { to: data.to, status: data.status, valid: data.valid }
        result(null, { data: resp, status: 200, msg: "Sucesso ao validar código!" });
    })
}

module.exports = TwilioApi;
