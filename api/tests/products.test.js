//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
let testProduct;

chai.use(chaiHttp);

describe("Unit Tests for Products", () => {
  before((done) => {
    testProduct = new Product({
      name: "test new HAHA",
      price: 30,
      img_url: "fileurl",
    });

    testProduct.save(function () {
      done();
    });
  });

  after((done) => {
    Product.findByIdAndDelete(testProduct._id, function () {
      done();
    });
  });

  describe("/GET Products", () => {
    it("it should GET all the products", (done) => {
      chai
        .request(server)
        .get("/product")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body[0].should.have.property("_id");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("price");
          res.body[0].should.have.property("img_url");
          done();
        });
    });
  });

  describe("/GET Product", () => {
    it("should GET a single product", (done) => {
      chai
        .request(server)
        .get("/product?_id=" + testProduct._id)
        .end((err, res) => {
          console.log("user found with name: " + testProduct.name);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("price");
          res.body.should.have.property("img_url");
          res.body.name.should.equal(testProduct.name);
          res.body.price.should.equal(testProduct.price);
          res.body.img_url.should.equal(testProduct.img_url);
          done();
        });
    });
  });
});
