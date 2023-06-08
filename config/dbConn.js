const mongoose=require('mongoose')
mongoose.set("strictQuery", false);

const connectDb=()=>{
  try {
     mongoose.connect(process.env.DATABASE_URI)
  } catch (error) {
    console.log(error);
  }
}
module.exports=connectDb