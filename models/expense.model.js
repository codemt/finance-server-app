module.exports = (sequelize,Sequelize) => {

    const Expense = sequelize.define("expense",{
        
        expense_head:{
            type: Sequelize.STRING,

        },
        amount:{
            type:Sequelize.INTEGER,
        },
        date:{
            type:Sequelize.DATEONLY
        }
    })
    return Expense;

}