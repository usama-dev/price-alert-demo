const { sendEmail } = require("./sendEmail");

exports.comparePrice = async (data) => {
  let { newPrice, oldPrice } = data;

  // Comparing price:
  if (oldPrice - newPrice >= 1) {
    console.log("Price decrease more than $1");
    sendEmail(data);
  }
};
