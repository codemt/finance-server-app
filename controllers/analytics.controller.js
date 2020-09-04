const db = require('../models')
const sequelize = require('sequelize')
const Op = db.Sequelize.Op
const Income = db.income
const Expense = db.expense

exports.IncomeHeadTotals = async(req,res) => {


    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const income_head = req.body.income_head;
    console.log(req.body)
    console.log(startdate)
    console.log(enddate)
        await Income.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
            raw: true,
            order: sequelize.literal('total DESC'),
            where: {
                user_id : user_id,
                income_head:income_head,
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

exports.IncomeHeadTotals = async(req,res) => {


    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const expense_head = req.body.income_head;
    console.log(req.body)
    console.log(startdate)
    console.log(enddate)
        await Expense.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
            raw: true,
            order: sequelize.literal('total DESC'),
            where: {
                user_id : user_id,
                expense_head:expense_head,
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
