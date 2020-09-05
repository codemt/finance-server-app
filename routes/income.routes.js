const controller = require('../controllers/income.controller')
const analytics = require('../controllers/analytics.controller')

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.get("/api/income/all/:user_id",controller.findAll);
      app.post("/api/income/create",controller.create);
      app.get("/api/income/:id",controller.findOne);
      app.put("/api/income/:id",controller.update);
      app.delete("/api/income/:id",controller.delete);
      app.post("/api/income/total/:user_id",controller.getMonthlyTotalIncome);
      app.post("/api/income/monthly/:user_id",controller.getMonthlyAllIncome);

      //analytics
      app.post("/api/income/analytics/:user_id",analytics.IncomeHeadTotals);
      app.get("/api/income/analytics/:user_id",analytics.getIncomeHeads);
      app.post("/api/income/analytics/monthly/:user_id",analytics.getMonthlyIncomeHeads);



}