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


app.get('/',(req,res)=>{

        res.send('Welcome to Express Server')

})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`Server Started at PORT ${PORT}`)
})