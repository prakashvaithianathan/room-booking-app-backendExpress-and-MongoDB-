const mongoose = require('mongoose');
const url = process.env.MONGO_URL 

const mongoDB = async()=>{
    try {
        const con= await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log(`database connected in ${con.connection.host}`);
    } catch (error) {
        console.log('error in connect to database');
    }
}

module.exports=mongoDB;