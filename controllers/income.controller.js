const db = require('../models')
const Op = db.Sequelize.Op
const sequelize = require('sequelize')
const Income = db.income

exports.findAll = (req,res) =>{

    let user_id = req.params.user_id;
  
      Income.findAll({ where : { user_id : user_id }})
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

exports.create = (req,res) => {

    if(!req.body.income_head){

        res.status(400).send({

                messege : 'Content cannot be empty!'    
        })
        return;
    }
    const income = {

        income_head: req.body.income_head,
        amount: req.body.amount,
        date:req.body.date,
        user_id: req.body.user_id
    }

    Income.create(income)
    .then(data => {

        res.send(data)

    })
    .catch(err => {

        res.status(500).send({

                messege:
                    err.messege || "Some error occured while creating the Tutorial"
        })

    })

}

exports.findOne = (req,res) =>{

    const id = req.params.id
    Income.findByPk(id)
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            messege:
            err.messege || `Cannot Find todo with given id ${id}`
        })
    })

}

exports.update = (req,res) =>{

    const id = req.params.id;
    console.log(req.body)
    Income.update(req.body,{
        where : { id : id }
    })
    .then(num =>{
        if(num == 1 ){
            res.send({
                messege: 'Your Income was Updated Succesfully '
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send({
            messege: 'Some Error Occured!'
        })    
    })
    
}
    
exports.delete = (req,res) =>{
    
        const id = req.params.id
        Income.destroy({
            where : { id : id }
        })
        .then(num =>{
            if(num ==1 ){
                res.send({
                        messege:'Item was succesfully deleted'
                })
            }
            else {
                res.send({
                    messege: `Cannot delete Todo with id=${id}`
                })
            }
        })
        .then(err =>{
            res.status(500).send({
                messege:
                err.messege || `Cannot Delete Todo with id=${id}`
            })
        })
}

exports.getMonthlyTotalIncome = async(req,res) => {

    
    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    console.log(req.body)
    console.log(startdate)
    console.log(enddate)
    await Income.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
        raw: true,
        order: sequelize.literal('total DESC'),
        where: {
             user_id : user_id,
             date : {
                    [Op.between]: [ startdate , enddate ]
             }
             }
    
    }).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
        res.send('Some Error Occured')
    })

}

exports.getMonthlyAllIncome = async(req,res) =>{


    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;

    await Income.findAll({
        where: {
             user_id : user_id,
             date : {
                    [Op.between]: [ startdate , enddate ]
             }
        }
    
    }).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
        res.send('Some Error Occured')
    })



}