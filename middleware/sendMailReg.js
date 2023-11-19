const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendMailRegBrevo=async(email,otp,access,userId)=>{
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.email_key;
    
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Fiin Register";
    sendSmtpEmail.htmlContent = `<html><body>
    <p>A FIIN recebeu uma solicitação para alteração da sua password.<br/>
    Para tal, nas próximas 24h deverá aceder ao seguinte link: </p><br/>
    ${access==="customer"?`<a href="https://portal.fiinservice.com/forget-pass/${otp}">
        Set Password Link</a>`:
    `Your password is: <h2>${otp}</h2><br/>
    Active account using below link:<br/>
    <a href="https://portal.fiinservice.com/active-user/${userId}">Active Now</a><br/>
    change password after login`}<br/>
    <span>Se não pediu para alterar a sua password, por favor, ignore o presente email.</span>
    </body></html>`;
    sendSmtpEmail.sender = {"name":"Fiin","email":"fiinservice@fiinservice.com"};
    sendSmtpEmail.to = [{"email":email}];
    //sendSmtpEmail.cc = [{"email":"tetikak@gmail.com","name":"Janice Doe"}];
    //sendSmtpEmail.bcc = [{"email":"dkmehr.com@gmail.com","name":"DKMehr"}];
    sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    var result = "";
    await apiInstance.sendTransacEmail(sendSmtpEmail)
    .then(function(data) {
        result = "accept"
        //console.log(JSON.stringify(data));
    }, function(err) {
        //console.log(err)
        result=({error:JSON.parse(err.response&&
            err.response.error&&err.response.error.text).message});
        
    });
    return(result)
}
module.exports =sendMailRegBrevo