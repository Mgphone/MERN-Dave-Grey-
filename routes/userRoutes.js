const express=require('express')
const router=express.Router();
const userController=require('../controllers/userController')

router.route('/')
.get()
.post()
.patch()
.delete()

module.exports=router