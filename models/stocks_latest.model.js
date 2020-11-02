module.exports = (sequelize,Sequelize) => {

    const stocks_latest = sequelize.define("stocks_latest",{
        
            stock_name:{

                type: Sequelize.STRING

            },
            open_price:{
                type: Sequelize.INTEGER
            },
            close_price:{
                type:Sequelize.INTEGER

            },
            low_price:{
                type:Sequelize.INTEGER
            },
            high_price:{
                type:Sequelize.INTEGER
            },
            date:{
                type:Sequelize.DATEONLY
            }


    })
    return stocks_latest
}
