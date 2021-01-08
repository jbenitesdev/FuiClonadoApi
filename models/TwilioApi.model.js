const Twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const { encrypt, decrypt } = require('../helper/crypto');

const TwilioApi  = function(twilioApi) {
    this.phoneNumber = twilioApi.phoneNumber;
    this.code = twilioApi.code;
    this.msg = twilioApi.msg;
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
            from: 'whatsapp:+1111111111111',
            body: 'Mensagem de teste do site FuiClonado, favor ignorar!',
            to: 'whatsapp:+11111111111'
        })
        .then(message => {
            console.log("")
          console.log(message.sid)
        });
}

TwilioApi.sendSMSMessage = (twilioApi, result) => {
    console.log("VALOR DE TWILIO API: ", twilioApi)
    const bindingOpts = {
        identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
        bindingType: 'sms',
        address: twilioApi.phoneNumber
    };

    const notificationOpts = {
        identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
        body: twilioApi.msg,
        // body: 'Knok-Knok! This is your first Notify SMS',
    };

    Twilio.notify
        .services(process.env.SMS_SERVICE_ID)
        .bindings.create(bindingOpts)
        .then(binding => console.log(binding.sid))
        .catch(error => console.log(error))
        .done();
    
    Twilio.notify
        .services(process.env.SMS_SERVICE_ID)
        .notifications.create(notificationOpts)
        .then(notification => console.log(notification.sid))
        .catch(error => console.log(error));
}

TwilioApi.sendSMSMessageOnly = (twilioApi, result) => {
    const number = decrypt({iv: process.env.TWILIO_IV, content: process.env.TWILIO_CON})
    console.log("VALOR DE TWILIO API: ", twilioApi)
    Twilio.messages.create({
        body: twilioApi.msg,
        from: number,
        to: twilioApi.phoneNumber
    }).then(message => console.log(message.sid));
}

module.exports = TwilioApi;
