const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var app = express()

var corOptions = {
        origin:true
}
app.use(cors(corOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// sync db 
const db = require('./models')
const Role = db.role
function initial(){
    Role.create({
        id:1,
        name:'user'
            
    })
    Role.create({
        id:2,
        name:'admin'
            
    })
    Role.create({
        id:3,
        name:'moderator'
            
    })
}
initial()
db.sequelize.sync()

require('./routes/auth.routes')(app);
require('./routes/income.routes')(app);
require('./routes/expense.routes')(app);
require('./routes/todolist.routes')(app);

app.get('/',(req,res)=>{

        res.send('Welcome to Morbius World Server')

})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`Server Started at PORT ${PORT}`)
})