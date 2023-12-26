const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')



//const Blog = mongoose.model('Blog', blogSchema)

mongoose.set('strictQuery', false)

console.log('connecting to ', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB')
        console.log('All Good:)')
    })
    .catch((error) => {
        console.log('error to connect')
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app