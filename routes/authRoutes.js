const passport = require("passport");

//export fun from file
module.exports = app => {
  //create route handler
  //watch for '/' using get, / is route, dependng on strategy specification
  //req is request for incoming request, res is object representing outgonig response
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //callback handle
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
