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
    return res.status(400).json({message:'No users found'})
  }
  res.json(users)
})

//create new user
//post/users
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

//update User
//patch/users
const updateUser=asyncHandler (async (req,res) =>{
  const{id,username,password,roles,active}=req.body
  //confirm data
  if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active!=='boolean'){
    return res.status(400).json({message:'All field except password are required'})
  }
  //Does user exit to update

const user=await User.findById(id).exec()

if(!user){
  return res.status(400).json({message:'User not found'})
}
//check for Duplicate
const duplicate=await User.findOne({username}).lean().exec()

//allow updates to original
if(duplicate&&duplicate?._id.toString()!==id){
  return res.status(409).json({message:'Duplicate Username'})
}
user.username=username
user.roles=roles
user.active=active
if(password){
  //hash password
  user.password=await bcrypt.hash(password,10)
}
const updateUser=await user.save()
res.json({message:`${updateUser.username} updated`})
})

//Delete user
const deleteUser=asyncHandler(async(req,res)=>{
  const {id}=req.body
  if(!id){
    return res.status(400).json({message:'User ID required'})
  }
  //Does user assigned notes
  const note=await Note.findOne({user:id}).lean().exec()
  if(note){
    return res.status(400).json({message:'User has assigned note'})
  }

  //does user exit to delete
  const user= await User.findById(id).exec()

  if(!user){
    return res.status(400).json({message:'user not found'})
  }
  const result=await user.deleteOne()
  const reply=`Username ${result.username} with ID${result._id} deleted`
  res.json(reply)
})
module.exports={
  getAllusers,
  createNewUser,
  deleteUser,
  updateUser
}