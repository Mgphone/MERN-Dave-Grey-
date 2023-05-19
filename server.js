require ('dotenv').config()
const express=require ("express")
const app=express()
const path=require('path')
const{logger,logEvents }=require('./middleware/logger')
const errorHandler=require('./middleware/errorHandler')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')
const connectDb=require('./config/dbConn')
const { default: mongoose } = require('mongoose')
const { log } = require('console')
const PORT=process.env.PORT||3000

connectDb();

app.use(logger)
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/',require('./routes/root'))
app.use('/users',require('./routes/userRoutes'))


app.use(errorHandler)

mongoose.connection.once('open',()=>{
  console.log('Connect to the Mongodb');
  app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
  })
})

mongoose.connection.on('error',err=>{
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

