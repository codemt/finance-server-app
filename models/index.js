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
db.user = require('./user.model.js')(sequelize,Sequelize)
db.role = require('./role.model.js')(sequelize,Sequelize)
db.income = require('./income.model')(sequelize,Sequelize)
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
db.roles = ['user','admin','moderator']

module.exports = db