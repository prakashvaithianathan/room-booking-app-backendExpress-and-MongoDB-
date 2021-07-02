const jwt = require('jsonwebtoken')


const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers['authorization'];
      const data=  await jwt.verify(token,process.env.SECRET_KEY,(err,data)=>{
        if(err){
               
                req.userId = err.message;
                next();
            }
            else{
                 
                req.userId=data.userId;
                if(req.userId){
                    next();
                }else{
                    console.log('expired');
                }
                
            }
      })
   
      
            
        
    } catch (error) {
        res.json({error})
    }
}

module.exports = authenticate;