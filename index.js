const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');

const app = express();

const port  = 5000;

app.use(cors());
app.use(express.json());


// connecting with the mongoose
mongoose.connect("mongodb://localhost:27017/testing", {
    // To fix all deprecation warning we will set
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=>{
    console.log("connected to the db sucessfully");
}).catch((err)=>{
    console.log(err.message);
})

app.use("/api/auth", userRoutes);


const server = app.listen(port, ()=>{
    console.log(`listening on port${port}`);
}); 


