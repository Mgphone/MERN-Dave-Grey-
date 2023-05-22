const User=require('../models/User')
const Notes=require('../models/Notes')
const asyncHandler=require('express-async-handler')


//get all notes
const getAllNotes=asyncHandler(async(req,res)=>{
  //get all notes from db
  const notes=await Notes.find().lean()
  //if no Notes
  if(!notes?.length){
    return res.status(400).json({message:'No Notes found'})
  }
  //add username to all note
  const notesWithUser=await Promise.all(notes.map(async (note)=>{
    const user=await User.findById(note.user).lean().exec()
    return{...note,username:user.username}
  }))
  res.json(notesWithUser)
})

//create new Notes
const createNotes=asyncHandler(async(req,res)=>{
  const{user,title,text}=req.body

  if(!user||!title||!text){
    return res.status(400).json({message:'All fields are required'})
  }
  //check with title
  const duplicate=await Notes.findOne({title}).lean().exec()
  if(duplicate){
    return res.status(409).json({message:'Duplicate title'})
  }

  //create and store
  // const userObject =await User.findById(user)

  // const noteObject={user:userObject,title,text}
  
  // const note=await Notes.create(noteObject)
  //create and store 

  //create notes 
const note=await Notes.create({user,title,text})

  if(note){
    res.status(201).json({message:`Note with ${title} is created`})
  }else{
    res.status(400).json({message:'Invalid note data received'})
  }
})

//update notes... patch/notes

const updateNote=asyncHandler(async(req,res)=>{
  const {id,user,title,text,Completed}=req.body;
  if(!id||!user||!title||!text|| typeof Completed!=='boolean'){
    return res.status(400).json({message:'All field are required'})
  }
  const note=await Notes.findById(id).exec()
  if(!note){
    return res.status(400).json({message:'not found'})
  }

  // Duplicate
const duplicate=await Notes.findOne({title}).lean().exec()
if(duplicate&&duplicate?._id.toString()!==id){
  return res.status(409).json({message:'Duplicate title'})
}
  //save
  note.title=title
  note.user=user
  note.text=text
  note.Completed=Completed
  const updateNote=await note.save()
  res.json({message:'updatated'})

})

//Deleted Note
const deleteNote=asyncHandler(async(req,res)=>{
  const {id}=req.body
  if(!id){
    return res.status(400).json({message:"Note Id required"})
  }
  // note exit to delete
  const note= await Notes.findById(id).exec()
  if(!note){
    return res.status(400).json({message:'NOte not found'})
  }
  const result=await note.deleteOne()
  const reply=`Note ${result.title} with ID${result._id} is deleted`
  res.json(reply)


})


module.exports={
  getAllNotes,
  createNotes,
  updateNote,
  deleteNote
}