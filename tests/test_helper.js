const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        id: "65847c26937cd024ffd76f9c",
        title: "10 tips for summer",
        author: "Victor",
        url: "idk",
        likes: 1,
        __v: 0
    },
    {
        id: "65847c45937cd024ffd76f9e",
        title: "10 tips for winter",
        author: "Alisa",
        url: "idk",
        likes: 1,
        __v: 0
    }
]

const blogsInDd = async () => {
    const blogs = await Blog.find({})
    return blogs.map(x => x.toJSON())
}

const userInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    blogsInDd, initialBlogs,
    userInDb
}