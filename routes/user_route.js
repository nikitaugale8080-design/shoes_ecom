var express = require("express");
var exe = require("../connection");
var url = require("url");
var sendMail = require("./send_mail");
var router = express.Router();

router.get("/", async function(req, res) {

    var sliders = await exe(`SELECT * FROM slider`);
    var trending_products = await exe(`SELECT * FROM products WHERE product_is_trending = 'Yes'`);
    var product_types = await exe(`SELECT * FROM product_types`);
    var product_styles = await exe(`SELECT * FROM product_styles`);
      var high_discount_products = await exe(`SELECT * FROM products ORDER BY apply_discount_percent DESC LIMIT 6`)
    var packet = {sliders,trending_products,product_types,product_styles,high_discount_products};
    res.render("user/home.ejs",packet);
});

router.get("/product_list",async function(req,res){

  var url_data = url.parse(req.url,true).query;
  if(url_data.cat)
  {
    if(url_data.cat == 'Mens')
    {
      var sql = `SELECT * FROM products WHERE product_for ='Male'`;

    }
    if(url_data.cat == 'womens')
    {
      var sql = `SELECT * FROM products WHERE product_for ='Female'`;
    }
    if(url_data.cat =='Boys')
    {
      var sql = `SELECT * FROM products WHERE product_for ='Boys' AND product_kid_type ='Boys'`;
    }
    if(url_data.cat =='Girls')
    {
      var sql = `SELECT * FROM products WHERE product_for ='Girls' AND product_kid_type ='Girls'`;
    }
  }
 
  
  var products = await exe(sql);
  var packet = {products};
  res.render("user/product_list.ejs",packet);
})


router.get("/product_details/:id", async function (req, res) {
  var id = req.params.id;
  var sql = `SELECT * FROM products WHERE product_id = '${id}'`;
  var info = await exe(sql);

  var is_login = req.session.user_id ? true : false;

  var packet = { info, is_login }; 
  res.render("user/product_details.ejs", packet);
});


router.get("/buy_now/:product_id",function(req,res){
   res.send("Buy Page Here");
})

router.post("/send_otp_mail", function(req, res) {
  var otp = Math.floor(1000 + Math.random() * 9000);
  var message = `Your One Time Password (OTP): ${otp}`;
  sendMail("nikitaugale8080@gmail.com", "Verification OTP", message);
  console.log("OTP:", otp);
  res.send({ success: true, otp });
});

module.exports = router;
