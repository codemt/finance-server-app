const db = require('../models')
const Op = db.Sequelize.Op
const Income = db.income

exports.displayIncome = (req,res) =>{


    Income.findAll({where :{ user_id: req.params.user_id }} )
    .then(data =>{
        console.log(res.data)
    })
    .catch(err=>{

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