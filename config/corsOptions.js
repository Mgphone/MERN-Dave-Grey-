const allowOrigins=require('./allowOrigins')
const corsOptions={
  origin:(origin,callback)=>{
    if(allowOrigins.indexOf(origin)!==-1){
      callback(null,true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credential:true,
  optionsSuccessStatus: 200
}
module.exports=corsOptions;