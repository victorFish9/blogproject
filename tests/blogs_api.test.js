const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id field is returned in json', async () => {
    const response = await api.get('/api/blogs')

    const content = response.map(i = i.id)

    expect(content).toBeDefined(helper.initialBlogs.id)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'something',
        author: 'VIctor',
        url: 'idk',
        likes: 1
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogsEnd = await helper.blogsInDd()
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsEnd.map(r => r.title)
    expect(contents).toContain('something')
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDd()
        const blogToDelete = blogAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogAtEnd = await helper.blogsInDd()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs - 1)

        const contents = blogAtEnd.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.content)
    })

})


afterAll(async () => {
    await mongoose.connection.close()
})
