const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  //allow express to run requireLogin  before req,res
  //runs middleware before async
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //console.log(req.body);//post card info token
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id // get req token id info
    });
    //console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save(); //get current user info
    res.send(user);
  });
};
