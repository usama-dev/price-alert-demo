const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  subscribedProducts: [
    {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "Product", // For populating the Products from the IDs
    },
  ],
});
const User = mongoose.model("User", userSchema);

module.exports = User;
