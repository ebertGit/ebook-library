"use strict";
const nodemailer = require("nodemailer");

async function main(message) {
  // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // user: testAccount.user,
      // pass: testAccount.pass
      user: "xxxx@gmail.com",
      pass: "xxxxxxxxxxxxxx"
    }
  });

  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
  send: main
}