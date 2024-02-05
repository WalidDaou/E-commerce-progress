
import express from 'express'
import Review from "../models/Review"
import User from "../models/User"
import { auth } from "../middleware/auth"

const ReviewsController = express.Router()


ReviewsController.get('/', auth, async(req, res)=>{
    try {
        
        // @ts-ignore
        const userId = req?.decoded.user._id
        if(!userId){
            return
        }
        const reviews = await Review.find({
            user: userId
        })
        res.json(reviews)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get reviews!" })
    }
})

ReviewsController.get('/:product_id', async (req, res) => {
    try {
        if (!req.params.product_id) {
            return
        }

        const reviews = await Review.find({
            product: req.params.product_id
        })

        res.json(reviews)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create store!" })
    }
})

ReviewsController.post('/create', auth,  async(req, res) =>{
    try {
        // @ts-ignore
        const userId = req?.decoded.user._id
        if(!userId){
            res.status(400).json({error: "Token is missing the userId"})
        }
        
        const {
            productId,
            comment,
            rating
        } = req.body
        
        const review = new Review({
            comment,
            rating,
            user: userId,
            product: productId,
        })
        
        const error = review.validateSync();
        if (error) {
            console.log(error)
            return res.status(400).json({ error: "Failed to validate review!" })
        }
        
        review.save()
        res.json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create store!" })
    }
})



export default ReviewsController