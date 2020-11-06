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
    
    const stock_name = req.body.stock_name
   if(!req.body.stock_name || !req.body.close_price || !req.body.open_price || !req.body.stock_name || !req.body.low_price || !req.body.high_price || !req.body.date || !req.body.user_id){

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


   function isStockUnique(stock_name) {
    return Stocks_Latest.count({ where: { stock_name: stock_name } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}


   isStockUnique(stock_name).then(isUnique => {
    if (isUnique) {
        console.log('yes stock name is unique')
        Stocks_Latest.create(stock_data)
        .then(data => {

            res.send(data)

        })
        .catch(err => {

            res.status(500).send({

                    messege:
                        err.messege || "Some error occured while creating the data!"
            })

        })

    }
    else{    

            res.status(500).send({
    
                messege: `Stock Already exists`
    
            })    
    }
});

   // save tutorial 
//    Stocks_Latest.create(stock_data)
//    .then(data => {

//        res.send(data)

//    })
//    .catch(err => {

//        res.status(500).send({

//                messege:
//                    err.messege || "Some error occured while creating the Tutorial"
//        })

//    })



}

exports.update = (req,res) =>{

    const stock_name = req.params.stock_name;
    console.log(stock_name)

    if(!req.body.stock_name || !req.body.close_price || !req.body.open_price || !req.body.stock_name || !req.body.low_price || !req.body.high_price || !req.body.date || !req.body.user_id){

        res.status(400).send({
 
                messege : 'Content cannot be empty!'    
        })
        return;
    }
 
    Stocks_Latest.update(req.body,{
    
        where : { stock_name : stock_name }
    
    })
    .then(num =>{
    
        if(num == 1 ){
    
            res.send({
    
                messege: 'Stock Details were Updated Succesfully '
    
            })
    
        }
    
    })
    .catch(err =>{
    
        res.status(500).send({
    
            err:
            err.messege || 'Some Error Occured '
    
        })
    
    
    })
    
    
    }


exports.delete = (req,res) =>{

        const id = req.params.id
        console.log(id)
        Stocks_Latest.destroy({
    
            where : { id : id }
        })
        .then(num =>{
            if(num ==1 ){
                res.send({
    
                        messege:'Stock was succesfully deleted'
                })
            }
            else {
    
    
                res.send({
    
                    messege: `Cannot delete Stock with id=${id}`
                })
    
            }
            
    
        })
        .then(err =>{
    
            res.status(500).send({
    
                messege:
                err.messege || `Cannot Delete Stock with id=${id}`
    
            })
    
    
        })
    
    }