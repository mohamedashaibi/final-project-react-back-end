const express = require('express')
const Product = require('../models/Product')
const router = express.Router()
const auth = require('../middleware/auth')


//GET: Gets all products
router.get('/', (req,res)=>{
    Product.find().then(products=>res.json(products)).catch((err)=>{res.status(401).send("Error retrieving products!")})
})


//POST: Insert an item to the db
router.post('/', auth, (req, res)=>{
    const body = req.body
    const prod = new Product(body.product)
    prod.save((err, doc)=>{
      if(err) return res.send(err)
      return res.json(doc)
    })

})


//GET: /search/:text (text = search query)
//Search for item/s with specified query string in their name
router.get('/search/:text', (req, res)=>{
  const text = req.params.text
  console.log(text)
  const query = { 'name': `/${text}/i` };
  Product.find({"name":  new RegExp('\\b' + text + '\\b', 'i') }, (err, doc)=>{
    console.log(doc)
    if(err) return console.log(err)
    return res.json(doc)
  })
})

router.put('/:id', (req,res)=>{
  console.log(req.body)
  Product.findByIdAndUpdate(req.params.id, req.body.product, (err,doc)=>{
    if(err) return res.json({msg: "Error editing specified doc!"})
    return res.json(doc)
  })
})


//DELETE: Delete an item with the specified id
router.delete('/:id', (req,res)=>{
  console.log(req.params.id)
  Product.findByIdAndDelete(req.params.id, (err, doc)=>{
    if(err) return res.json({msg: "Error deleting specified doc!"})
    return res.json(doc)
  })
})
module.exports = router