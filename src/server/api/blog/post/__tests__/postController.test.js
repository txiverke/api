import request from 'supertest-as-promised'
import app from '../../../../index'

let posts = []

describe('[ POST CRUD ]', () => {
  describe('READ posts', () => {
    it('should return a list of posts', async () => {
      const response = await request(app).get('/api/blog/posts')
      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array)

      posts = [...response.body]
    })

    it('should return one post', async () => {
      const id = posts[posts.length - 1]._id
      const response = await request(app).get(`/api/blog/posts/${id}`)
      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Object)
    })

    it('should return a 400 if the id does not exist in the DDBB', async () => {
      const response = await request(app).get('/api/blog/posts/3')
      expect(response.error.status).toEqual(400)
    })
  })

  describe('CREATE post', () => {
    const body = {
      title: 'test title',
      file: { 
        originalname: 'test.png',
        filename: 'test.png' 
      },
      content: 'test content',
      tags: 'test',
      link: 'test.html'
    }

    it('should return Unauthorized', async () => {
      const response = await request(app).post('/api/blog/posts').send(body)
      expect(response.statusCode).toEqual(401)
    })

    it('should create a post', async () => {
      const obj = {
        username: 'txiverke',
        password: 'testing'
      }

      const signin = await request(app)
        .post('/auth/signin')
        .send(obj)
        .set('Content-Type', 'application/json')

      const token = signin.body.token

      const response = await request(app)
        .post('/api/blog/posts')
        .send(body)
        .set('access-token', token)

      posts = [...response.body]

      expect(response.statusCode).toEqual(201)
      expect(posts).toBeInstanceOf(Array)
      expect(posts[posts.length - 1].title).toEqual(body.title)
    })
  })

  describe('UPDATE posts', () => {
    const body = {
      title: 'update test title',
      file: { 
        originalname: 'test.png',
        filename: 'test.png' 
      },
      content: 'test content',
      tags: 'test',
      link: 'test.html'
    }

    it('should update a post', async () => {
      const obj = {
        username: 'txiverke',
        password: 'testing'
      }

      const signin = await request(app)
        .post('/auth/signin')
        .send(obj)
        .set('Content-Type', 'application/json')

      const token = signin.body.token

      const response = await request(app)
        .put(`/api/blog/posts/${posts[posts.length - 1]._id}`)
        .send(body)
        .set('access-token', token)

      posts = [...response.body]

      expect(response.statusCode).toEqual(200)
      expect(posts).toBeInstanceOf(Array)
      expect(posts[posts.length - 1].title).toEqual(body.title)
    })    
  })

  describe('DELETE posts', () => {
    it('should delete a post', async () => {
      const obj = {
        username: 'txiverke',
        password: 'testing'
      }

      const signin = await request(app)
        .post('/auth/signin')
        .send(obj)
        .set('Content-Type', 'application/json')

      const token = signin.body.token
      const currentPost = posts.length
      const response = await request(app)
        .delete(`/api/blog/posts/${posts[posts.length - 1]._id}`)
        .set('access-token', token)

      posts = [...response.body]

      expect(response.statusCode).toEqual(200)
      expect(posts).toBeInstanceOf(Array)
      expect(posts.length).toEqual(currentPost -1)
    })
  })
})
