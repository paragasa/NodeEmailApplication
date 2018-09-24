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
  //callback handle, send to middleware

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  //REDIRECT TO ROOTPAGE OR AJAX
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
