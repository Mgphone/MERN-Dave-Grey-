const mongoose=require('mongoose')
mongoose.set("strictQuery", false);

const connectDb=async()=>{
  try {
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (error) {
    console.log(error);
  }
}
module.exports=connectDb