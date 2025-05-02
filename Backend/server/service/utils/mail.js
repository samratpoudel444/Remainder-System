const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: `gmail`,

  auth: {
    user: "poudelsamrat444@gmail.com",
    pass: "glch cssv nkcz mbug",
  },
});

const mailService = async (data) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: data.email,
    subject: "Wishing you happy birthday",
    body: `Dear ${data.firstName}, Many many happy returns of the day may your all the dream will come true`,
  });
  return;
};

module.exports = { mailService };
