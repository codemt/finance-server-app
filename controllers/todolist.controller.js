const db = require('../models')
const Todolist = db.todolist
const Op = db.Sequelize.Op

// create and save
exports.create = (req,res) =>{

     // console.log(token)
    // validate request
    if(!req.body.title){

        res.status(400).send({

                messege : 'Content cannot be empty!'    
        })
        return;
    }

    // create tutorial
    const todolist = {

        title: req.body.title,
        todo: req.body.todo,
        done:req.body.done ? req.body.done : false,
        user_id: req.body.user_id
    }

    // save tutorial 
    Todolist.create(todolist)
    .then(data => {

        res.send(data)

    })
    .catch(err => {

        res.status(500).send({

                messege:
                    err.messege || "Some error occured while creating the Tutorial"
        })

    })



}

exports.findAll = (req,res) =>{

  let user_id = req.params.user_id;

    Todolist.findAll({ where : { user_id : user_id }})
    .then(data => {

        res.send(data)

    })
    .catch(err =>{

        res.send(500).send({

                messege: 
                err.messege || "Some error occured"
        })

    })


}

exports.findOne = (req,res) =>{

    const id = req.params.id


    Todolist.findByPk(id)
    .then(data =>{

        res.send(data)


    })
    .catch(err =>{

        res.status(500).send({

            messege:
            err.messege || `Cannot Find todo with given id ${id}`

        })


    })

}

exports.update = (req,res) =>{

const id = req.params.id;

Todolist.update(req.body,{

    where : { id : id }

})
.then(num =>{

    if(num == 1 ){

        res.send({

            messege: 'Todolist was Updated Succesfully '

        })

    }

})
.catch(err =>{

    res.status(500).send({

        err:
        err.messege || 'Some Error Occured '

    })


})


}

exports.delete = (req,res) =>{

    const id = req.params.id

    Todolist.destroy({

        where : { id : id }
    })
    .then(num =>{
        if(num ==1 ){
            res.send({

                    messege:'Todo was succesfully deleted'
            })
        }
        else {


            res.send({

                messege: `Cannot delete Todo with id=${id}`
            })

        }
        

    })
    .then(err =>{

        res.status(500).send({

            messege:
            err.messege || `Cannot Delete Todo with id=${id}`

        })


    })

}