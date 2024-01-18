import express, { json } from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from "cors"
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())


const dishSchema = new Schema({
    name: String,
    desc: String,
    price: Number,


});

const dishModel = mongoose.model('Dish', dishSchema);

app.get('/', async (req, res) => {
    const dish = await dishModel.find({})
    res.send(dish)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const dish = await dishModel.findById(id)
    res.send(dish)
})

app.post('/', async (req, res) => {
    const { name, desc, price } = req.body
    const newDish = new dishModel({ name, desc, price })
    await newDish.save()
    res.send('Got a POST request')
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, desc, price } = req.body
    const dish = await dishModel.findByIdAndUpdate(id, { name, desc, price })
    res.send(dish)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const dish = await dishModel.findByIdAndDelete(id)
    res.send(dish)
})

mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})