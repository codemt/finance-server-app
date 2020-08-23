const controller = require('../controllers/expense.controller')

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.get("/api/expense/all/:user_id",controller.findAll);
      app.post("/api/expense/create",controller.create);
      app.get("/api/expense/:id",controller.findOne);
      app.put("/api/expense/:id",controller.update);
      app.delete("/api/expense/:id",controller.delete);
      app.post("/api/expense/total/:user_id",controller.getMonthlyTotalExpense);
      app.post("/api/expense/monthly/:user_id",controller.getMonthlyAllExpense);



}