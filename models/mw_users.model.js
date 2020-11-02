module.exports = (sequelize, Sequelize) => {


    const mw_users = sequelize.define("mw_users", {

        google_id: {

            type: Sequelize.STRING,
            primaryKey:true,

        },
        name: {

            type: Sequelize.STRING

        },
        email: {

            type: Sequelize.STRING

        },
        provider_name: {

            type: Sequelize.STRING

        },
        image: {
            type: Sequelize.STRING
        }
    })
    return mw_users;

}