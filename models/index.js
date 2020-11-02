const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{

        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatorAliases:false,
        pool: {

            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle

        }
    }  
);
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// total finance
db.user = require('./user.model.js')(sequelize,Sequelize)
db.role = require('./role.model.js')(sequelize,Sequelize)
db.income = require('./income.model')(sequelize,Sequelize)
db.expense = require('./expense.model')(sequelize,Sequelize)
db.todolist = require('./todolist.model.js')(sequelize,Sequelize)

// marketwatch 
db.mw_users = require('./mw_users.model')(sequelize,Sequelize)
db.stocks_latest = require('./stocks_latest.model.js')(sequelize,Sequelize)


//total finance
db.role.belongsToMany(db.user,{

    through:"user_roles",
    foreignKey:"role_id",
    otherKey:"user_id"
})
db.user.belongsToMany(db.role,{

    through:"user_roles",
    foreign_key:"role_id",
    otherKey:"role_id"

})
db.income.belongsTo(db.user,{ foreignKey:'user_id'})
db.expense.belongsTo(db.user,{ foreignKey:'user_id'})
db.todolist.belongsTo(db.user,{ foreignKey:'user_id'})
db.roles = ['user','admin','moderator']


// marketwatch
db.stocks_latest.belongsTo(db.mw_users,{ foreignKey:'google_id'})

module.exports = db