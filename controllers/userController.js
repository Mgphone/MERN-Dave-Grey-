const User=require('../models/User')
const Note=require('../models/Notes')
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')

//get all users
//get users
//access private

const getAllusers=asyncHandler(async(req,res)=>{
  //get all users from db
  const users=await User.find().select('-password').lean()
  //if no users
  if(!users?.length){
    return res.status(400).json({message:'No user foound'})
  }
  res.json(users)
})