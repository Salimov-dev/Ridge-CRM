import express from 'express'
import auth from "../middleware/auth.middleware.js"

const router = express.Router({ mergeParams: true })



export default router