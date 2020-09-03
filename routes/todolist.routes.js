const { authJWT } = require('../middlewares')
const controller = require('../controllers/todolist.controller')

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //app.get("/api/test/all", controller.allAccess);
  
    app.post("/api/todo/create",
      controller.create
    );

    app.get("/api/todo/all/:user_id",
        controller.findAll
    )

    app.get('/api/todo/:id',
      controller.findOne
    )

    app.put('/api/todo/:id',
      controller.update
    )

    app.delete("/api/todo/:id",
      controller.delete
    )


  
   
  };
  