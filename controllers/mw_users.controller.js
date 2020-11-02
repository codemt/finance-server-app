const db = require('../models')
const user =  db.mw_users
const Op = db.Sequelize.Op

exports.saveUserData = (req,res) =>{

    const id = req.body.google_id
    if(!req.body.name){
        res.status(400).send({
                messege : 'Content cannot be empty!'    
        })
        return;
    }

    const user_data = {

        google_id:req.body.google_id,
        name:req.body.name,
        email: req.body.email,
        image:req.body.image,
        provider_name: req.body.providerId,
    
    }
console.log(user_data)


function isIdUnique(id) {
    return user.count({ where: { google_id: id } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

isIdUnique(id).then(isUnique => {
    if (isUnique) {
        console.log('yes id is unique')
        user.create(user_data)
        .then(data => {

            res.send(data)

        })
        .catch(err => {

            res.status(500).send({

                    messege:
                        err.messege || "Some error occured while creating the data!"
            })

        })

    }
    else{

      //  res.send({messege: "ID already Exists!"})
        user.findByPk(id)
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
});



// user.create(user_data)
// .then(data => {

//     res.send(data)

// })
// .catch(err => {

//     res.status(500).send({

//             messege:
//                 err.messege || "Some error occured while creating the data!"
//     })

// })



    
  
}




  