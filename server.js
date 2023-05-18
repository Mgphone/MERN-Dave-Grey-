<<<<<<< HEAD

=======
>>>>>>> 1484032abd9987ca71a7ad8261df9c94ed719fca
require('dotenv').config()
const express=require ("express")
const app=express()
const path=require('path')
const PORT=process.env.PORT||3000


app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/',require('./routes/root'))

app.all("*",(req,res)=>{
  res.status(400)
    if(req.accepts('html')){
      res.sendFile(path.join(__dirname, 'views/404.html'))
    } else if(req.accepts('json')){
      res.json({message:'404 not foound'})  
    }else{
      res.type('txt').send('404 not found')
    }

})

<<<<<<< HEAD
app.use(errorHandler)
app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`)
=======
>>>>>>> 1484032abd9987ca71a7ad8261df9c94ed719fca

app.listen(PORT,()=>{
  console.log(`Server is listening on port  ${PORT}`);
})
