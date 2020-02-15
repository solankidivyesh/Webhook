const mongoose = require('mongoose');
const URL ="mongodb://webhook:webhook@139.59.5.96:27017/webhook"

mongoose.Promise =global.Promise;

module.exports=()=>{
    return mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true 
        
    }).then(()=>{
        console.log("database connection");
    }).catch(err=>{
        console.log("databse error",err);
        process.exit();
    });
}