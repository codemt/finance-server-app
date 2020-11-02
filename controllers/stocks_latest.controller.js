const db = require('../models')
const Stocks_Latest = db.stocks_latest
const Op = db.Sequelize.Op

exports.findAll = (req,res) =>{

      Stocks_Latest.findAll()
      .then(data => {
  
          res.send(data)
  
      })
      .catch(err =>{
  
          res.send(500).send({
  
                  messege: 
                  err.messege || "Some error occured"
          })
  
      })
  
  
  }

exports.findUserStocks = (req,res) =>{

    Stocks_Latest.findAll({ where : { google_id : req.params.id }})
    .then(data => {

        res.send(data)

    })
    .catch(err =>{

        res.send(500).send({

                messege: 
                err.messege || "Some error occured"
        })

    })


}




exports.save = (req,res) =>{

    // console.log(token)
   // validate request
   if(!req.body.stock_name || !req.body.close_price || !req.body.open_price || !req.body.stock_name || !req.body.low_price || !req.body.high_price || !req.body.date){

       res.status(400).send({

               messege : 'Content cannot be empty!'    
       })
       return;
   }

   // create tutorial
   const stock_data = {

       stock_name:req.body.stock_name,
       open_price: req.body.open_price,
       close_price:req.body.close_price,
       low_price:req.body.low_price,
       high_price: req.body.high_price,
       date:req.body.date,
       google_id: req.body.user_id
   }
   console.log(stock_data)

   // save tutorial 
   Stocks_Latest.create(stock_data)
   .then(data => {

       res.send(data)

   })
   .catch(err => {

        console.log(err)
       res.status(500).send({

               messege:
                   err.messege || "Some error occured while creating the Tutorial"
       })

   })



}

  