const mongoose = require("mongoose");
const { Schema } = mongoose;
const { comparePrice } = require("../services/priceComparison");

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    img_url: String,
  }
  // This is supposed to work but for some reason it's not, should report the bug to mongoose.
  // {
  //     changeStreamPreAndPostImages: { enabled: false }
  // }
);
const Product = mongoose.model("Product", productSchema);

// Setting up the event listner to any collection update:
Product.watch(
  [
    { $match: { operationType: "update" } },
    {
      // Projection for readability
      $project: {
        meta: "$fullDocument",
        newPrice: "$fullDocument.price",
        oldPrice: "$fullDocumentBeforeChange.price",
      },
    },
  ],
  {
    fullDocument: "required",
    fullDocumentBeforeChange: "required",
  }
).on("change", (data) => comparePrice(data));

module.exports = Product;
