const express = require('express')
const app = express();
const bodyParser= require('body-parser')
const cors= require('cors')
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  
}).then(()=> console.log('mongodb connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(bodyParser.json());


app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))


const port =5000;
app.listen(port, ()=>{
    console.log(`server start ${port}`)
})