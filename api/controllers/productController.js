const mongoose = require("mongoose");
const Product = mongoose.model("Product");

// CREATE
exports.post = async (req, res) => {
  try {
    const postData = req.body;
    console.log("Product Body: ", postData);

    // Saving document
    let product = new Product(postData);
    let result = await product.save();

    console.log(`Product Added: ${result.name}`);
    res.send(`Product Added: ${result.name}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// READ
exports.get = async (req, res) => {
  try {
    let { _id } = req.query;

    let result;
    // Single document
    if (_id) {
      result = await Product.findOne({ _id }); // Finding document on provided id
    }
    // All documents
    else {
      result = await Product.find();
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// UPDATE
exports.put = async (req, res) => {
  try {
    const query = { _id: req.query._id };

    let postBody = req.body;
    console.log(`_id-----------${query._id}`);
    console.log(postBody);

    const result = await Product.updateOne(query, postBody); // Update document with the provided _id
    console.log(result);

    if (result.matchedCount == 0) {
      // mongo result
      console.log("No Product with this ID found!");
      res.send("No Product with this ID found!");
    } else {
      console.log("Product Updated!");
      res.send("Product Updated!");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const { _id } = req.query;

    const result = await Product.findOneAndRemove({ _id }); // Delete document with the provided _id
    console.log(result);
    if (result) {
      console.log(`Product ID: ${_id}, Name: ${result.name} Deleted!`);
      res.send(`Product ID: ${_id}, Name: ${result.name} Deleted!`);
    } else {
      console.log(`No Product with this ID: ${_id} found!`);
      res.send(`No Product with this ID: ${_id} found!`);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
