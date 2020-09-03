module.exports = (sequelize,Sequelize) => {

    const Todolist = sequelize.define("todolist",{

            todo:{

                type: Sequelize.STRING

            },
            completed:{
                type:Sequelize.BOOLEAN

            }


    })
    return Todolist
}
