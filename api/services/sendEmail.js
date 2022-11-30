const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const User = mongoose.model("User");

let transporter = nodemailer.createTransport({
  // All these hardcoded values are there just for the demo, for production App we can use proper SMTP Server.
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "martina.torphy@ethereal.email", // generated ethereal user
    pass: "SUD9VD1Q8n26tkjS75", // generated ethereal password
  },
});

exports.sendEmail = async (data) => {
  console.log("Data from sendEmail---:", data);

  // Find users those have subscribed to this product
  const users = await User.find({ subscribedProducts: data.meta._id });
  console.log("Found users with IDs", users);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ecom Sales Manager 👻" <sales@ecom.com>', // sender address
    to: users.map((arr) => arr.email).toString(), // list of receivers
    subject: "Whoohoo! Your favourite product price dropped!!", // Subject line
    text: `The price for the product: ${data.meta.name} dropped from ${data.oldPrice} to ${data.newPrice}`, // plain text body
    html: `The price for the product: <b>${data.meta.name}</b> dropped <br><br>
        New Price: $${data.newPrice} - <s>$${data.oldPrice}</s> <br><br>
        Link to the product: <a href="http://localhost:4000/product/${data.meta._id}">here!</a>
        `, // html body
  });
  console.log("Email sent!!!");

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
