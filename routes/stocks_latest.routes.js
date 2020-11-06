const controller = require('../controllers/stocks_latest.controller')

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    // get all stocks
    app.get("/api/stocks/all",
        controller.findAll
    )
    // get stocks by user
    app.get("/api/stocks/:id",
    controller.findUserStocks
  )
    // add stocks 
    app.post("/api/stocks/add",
    controller.save
    )
    // update stocks
    app.post("/api/stocks/update/:stock_name",
    controller.update
    )
    // delete stocks
    app.delete("/api/stocks/:id",
      controller.delete
    )


  
   
  };
  