const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')


//const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://victorcherkasov222:12345@cluster0.4wpbalw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app