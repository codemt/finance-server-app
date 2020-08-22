const controller = require('../controllers/income.controller')

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post("/api/income/all/:user_id",controller.displayIncome);
      app.post('/api/income/create',controller.create);



}