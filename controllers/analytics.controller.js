const db = require('../models')
const sequelize = require('sequelize')
const Op = db.Sequelize.Op
const Income = db.income
const Expense = db.expense

exports.getMonthlyIncomeHeads = async(req,res) =>{

    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;

        await Income.findAll({
            attributes: ['income_head'],
            raw: true,
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

exports.getMonthlyExpenseHeads = async(req,res) =>{

    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;

        await Expense.findAll({
            attributes: ['expense_head'],
            raw: true,
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

exports.getIncomeHeads = async(req,res) =>{

    const user_id = req.params.user_id;

        await Income.findAll({
            attributes: ['income_head'],
            raw: true,
            where: {
                user_id : user_id,
                }
        }).then(data=>{
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
            res.send('Some Error Occured')
        })



}

exports.getExpenseHeads = async(req,res) =>{

    const user_id = req.params.user_id;

        await Expense.findAll({
            attributes: ['expense_head'],
            raw: true,
            where: {
                user_id : user_id,
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
    const income_head = req.body.income_head;
    console.log(req.body)
    console.log(startdate)
    console.log(enddate)
        await Income.findAll({
            attributes: ['income_head',[sequelize.fn('sum', sequelize.col('amount')), 'total']],
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

exports.ExpenseHeadTotals = async(req,res) => {


    const user_id = req.params.user_id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const expense_head = req.body.expense_head;
    console.log(req.body)
    console.log(startdate)
    console.log(enddate)
        await Expense.findAll({
            attributes: ['expense_head',[sequelize.fn('sum', sequelize.col('amount')), 'total']],
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
