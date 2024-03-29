const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

// routes for total finance 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkUserExistsorNot,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.put("/api/auth/reset/password",controller.changePassword);
};
