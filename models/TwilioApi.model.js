const Twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const TwilioApi  = function(twilioApi) {
    this.phoneNumber = twilioApi.phoneNumber;
    this.code = twilioApi.code;
}

TwilioApi.verify = (twilioApi, result) => {
    Twilio.verify.services(process.env.SERVICE_ID).verifications.create({
    to: twilioApi.phoneNumber, channel: process.env.TWILIO_CHANNEL
    }).then(data => {
        let resp = { to: data.to, status: data.status, valid: data.valid }
        result(null, { data: resp, status: 200, msg: "Sucesso ao enviar código!" });
    }).catch(e => { console.error('Error:', e.code, e.message); });
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

TwilioApi.sendWhatsappMessage = (twilioApi, result) => {
    Twilio.messages
        .create({
            from: 'whatsapp:+19292992511',
            body: 'Mensagem de teste do site FuiClonado, favor ignorar!',
            to: 'whatsapp:+5521995640965'
        })
        .then(message => {
            console.log("")
          console.log(message.sid)
        });
}

module.exports = TwilioApi;
