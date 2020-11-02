module.exports = (sequelize,Sequelize) => {

    const Income = sequelize.define("income",{
        
        income_head:{
            type: Sequelize.STRING,
        },
        amount:{
            type:Sequelize.INTEGER,
        },
        date:{
            type:Sequelize.DATEONLY
        }
    })
    return Income;

}