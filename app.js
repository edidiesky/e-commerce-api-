
const express = require('express')
const app = express();

const userRoute = require('./Routes/Clients')
const authRoute= require('./Routes/authClients')
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan= require("morgan")

require('dotenv').config()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true}, ()=> {
        console.log('mongo has been connected');
    })


// middlewares used in the project
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)







app.listen(process.env.PORT || 4000, ()=> {
    console.log('server is listening on port 4000');
})


/**
 * the rest api will be useful in handling  users in a data base
 * we create a mark representation of our user schema
 * sigin form are the means of sending data from the user to the server for the client to be added or created in the data
 * browser can only perform a get req not a post req or other http methods
 * how can we then add the newuser to our data base
 * 
 */