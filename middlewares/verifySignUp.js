const db = require('../models')
const ROLES = db.roles
const User = db.user

checkUserExistsorNot = (req,res,next) =>{


    //Username 
    User.findOne({
            where: { username:req.body.username}
    })
    .then(user =>{

        if(user){

            res.statues(400).send({

                messege:"Failed! Username is already is already in Use!"

            })
        }

    })

    // Email
    User.findOne({
        where: { email: req.body.username }
    })
    .then(user => {

        if(user){
            res.send(400).send({

                messege:"Failed! Email is already use"

            })
            return;
        }
    })
    next()


}

checkRolesExisted = (req,res,next) =>{


    if(req.body.roles){

        for(let i=0;i<req.body.roles.length;i++)
        {

            if(!ROLES.includes(req.body.roles[i])){

                    res.status(400).send({

                        messege:"Failed!Role does not exist"

                    })

            }


        }


    }
    next()

}
const verifySignUp = {

    checkUserExistsorNot: checkUserExistsorNot,
    checkRolesExisted : checkRolesExisted

}
module.exports = verifySignUp
