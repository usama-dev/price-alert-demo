const mongoose = require("mongoose");
const User = mongoose.model("User");

// CREATE
exports.post = async (req, res) => {
  try {
    const postData = req.body;
    console.log("User Body: ", postData);

    const query = { email: postData.email };
    let update = { ...postData };

    if (postData.product_id && mongoose.isValidObjectId(postData.product_id))
      update["$addToSet"] = { subscribedProducts: postData.product_id }; // $addToSet instead of $push cos we don't want duplicate products

    console.log(update);

    // Options for update
    let options = {
      new: true, // Return new record
      upsert: true, // Add a new record if not found
    };

    let doc = await User.findOneAndUpdate(query, update, options);

    console.log("User Added/Updated: ", doc);
    res.send(`User Added: ${doc.name}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// READ
exports.get = async (req, res) => {
  try {
    let { _id, email } = req.query;
    let query = {};
    if (_id) query._id = _id;
    if (email) query.email = email;

    let result;
    // Single document
    if (_id || email) {
      console.log(query);
      result = await User.findOne(query).populate("subscribedProducts"); // Finding document on provided id
    }
    // All documents
    else {
      result = await User.find();
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

    const result = await User.updateOne(query, postBody); // Update document with the provided _id
    console.log(result);

    if (result.matchedCount == 0) {
      console.log("No User with this ID found!");
      res.send("No User with this ID found!");
    } else {
      console.log("User Updated!");
      res.send("User Updated!");
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

    const result = await User.findOneAndRemove({ _id }); // Delete document with the provided _id
    console.log(result);
    if (result) {
      console.log(`User ID: ${_id}, Name: ${result.name} Deleted!`);
      res.send(`User ID: ${_id}, Name: ${result.name} Deleted!`);
    } else {
      console.log(`No User with this ID: ${_id} found!`);
      res.send(`No User with this ID: ${_id} found!`);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
