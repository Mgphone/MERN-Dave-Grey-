const allowOrigins=require('./allowOrigins')
const corsOptions={
  origin:(origin,callback)=>{
    // if(!origin) return callback(null, true);
    if(allowOrigins.indexOf(origin)!==-1|| !origin){
      callback(null,true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  
  credential:true,
  optionsSuccessStatus: 200
}
module.exports=corsOptions;

