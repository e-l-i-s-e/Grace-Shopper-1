let nodemailer = require('nodemailer')
let smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'ScentedShopper@gmail.com',
    pass: 'Scented1809'

  }
}));

module.exports = function sendEmail(email) {
  var mailOptions = {
    from: 'ScentedShopper@gmail.com',
    to: email,
    subject: 'Your Scented.com order',
    text: 'Thanks for your purchase with Scented!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
