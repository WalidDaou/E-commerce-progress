import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// Using ES6 imports
import mongoose from 'mongoose';

import ProductsController from "./controllers/ProductsController";


import StoreController from "./controllers/StoreController";
import UsersController from "./controllers/UserController";
import ReviewsController from "./controllers/ReviewsController";
import OrdersController from "./controllers/OrdersController";
dotenv.config()

const PORT = process.env.PORT
const databaseURL = process.env.DATABASE_URL || 'default_connection_string';
const app = express()


app.use(express.static('public'))
// needed to allow parsing the request body as JSON
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cors())

// products
app.use('/api/v1/product', ProductsController)
app.use('/api/v1/products', ProductsController)

// store
app.use('/api/v1/store', StoreController)
app.use('/api/v1/stores', StoreController)

// user
app.use('/api/v1/user', UsersController)
app.use('/api/v1/users', UsersController)

// review
app.use('/api/v1/review', ReviewsController)
app.use('/api/v1/reviews', ReviewsController)

// order
app.use('/api/v1/order', OrdersController)
app.use('/api/v1/orders', OrdersController)



console.log("log after mongoose.connect")
app.get('/ready', (req, res) => {
    res.send('Server is running!')
})

console.log(databaseURL)
if (!databaseURL) {
    throw new Error('DATABASE_URL is not defined in the environment variables.');
}
mongoose.set('strictQuery', false);


mongoose.connect(databaseURL)
    .then(() => {
        console.log('Connected to MongoDB Atlas!')
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`)
        })
    });

// async function start() {
//     await mongoose.connect(process.env.DATABASE_URL);
//     app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}!`)
//     })
// }