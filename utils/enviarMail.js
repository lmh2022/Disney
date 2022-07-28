const nodemailer = require('nodemailer');

let main= async (destinatario) => {
  let transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org", port: 587, auth: {
  user: "postmaster@sandbox7f6575b1afac4b13a519d0c65cd1e175.mailgun.org",
   pass: "4100620c9284371ecc2c097eb9ddecf8-787e6567-045dcbbe"},

});

 let info = await transporter.sendMail({
    from: 'mailing@disneyworld.com', to: destinatario, subject: "Welcome!", text: "Welcome to Disney World!"
});

console.log("Message sent: %s", info.messageId);

}


module.exports=main