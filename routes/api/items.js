const express = require('express');
const router = express.Router();
const Item =  require('../../models/Item');

router.get('/',(req,res)=>{
	Item.find().sort({date:-1})
	.then(items => res.json(items))
})

router.post('/', (req,res)=>{
	const {name}= req.body;
	const newUser = new Item({
		name
	}) 
	newUser.save()
	.then(()=> res.json(newUser))
	.catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id', (req,res)=>{
	Item.findByIdAndDelete(req.params.id)
	.then(user=> res.json(user))
	.catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router; 