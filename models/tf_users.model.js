module.exports = (sequelize, Sequelize) => {


    const tf_users = sequelize.define("tf_users", {

        user_id: {

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
    return tf_users;

}