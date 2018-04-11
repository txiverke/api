// @flow

import request from 'supertest-as-promised'
import app from '../../../../index'

let projects = []
let project = {}

describe('[  PROJECT CRUD  ]', () => {
  describe('READ projects', () => {
    it('should return a list of projects', async () => {
      const response = await request(app).get('/api/blog/projects')
      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array)

      projects = [...response.body]
    })

    it('should return one specific post', async () => {
      const id = projects[projects.length - 1]._id
      const response = await request(app).get(`/api/blog/projects/${id}`)
      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Object)
    })

    it('should returm Error if the _id does not exist', async () => {
      const response = await request(app).get('/api/blog/projects/1')
      expect(response.statusCode).toEqual(500)
    })
  })

  describe('CREATE project', () => {
    const body = {
      title: 'Testing create projects.',
      file: { 
        originalname: 'test.png',
        filename: 'test.png' 
      },
      summary: 'New summary test'
    }

    it('should create a new post', async () => {
      const user = {
        username: 'txiverke',
        password: 'testing'
      }

      const signin = await request(app)
        .post('/auth/signin')
        .send(user)
        .set('Content-Type', 'application/json')

      const token = signin.body.token
  
      const response = await request(app)
        .post('/api/blog/projects')
        .send(body)
        .set('access-token', token)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toEqual(projects.length + 1)
    })
  })

  describe('UPDATE post', () => {
    const body = {
      title: 'Updated title test',
      summary: 'New summary test'
    }

    it('should update a post', async () => {
      const user = {
        username: 'txiverke',
        password: 'testing'
      }

      const signin = await request(app)
        .post('/auth/signin')
        .send(user)
        .set('Content-Type', 'application/json')

      const token = signin.body.token
      project = projects.find(item => item.title.includes('Testing create projects.'))
  
      const response = await request(app)
        .put(`/api/blog/projects/${project._id}`)
        .send(body)
        .set('access-token', token)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array)

      projects = [...response.body]
      project = projects.find(item => item._id === project._id)
      expect(project.title).toEqual(body.title)
    })
  })

  describe('DELETE post', () => {
    it('should delete a post', async () => {
      const user = {
        username: 'txiverke',
        password: 'testing'
      }

      const signin = await request(app)
        .post('/auth/signin')
        .send(user)
        .set('Content-Type', 'application/json')

      const token = signin.body.token
  
      const response = await request(app)
        .delete(`/api/blog/projects/${project._id}`)
        .set('access-token', token)

      expect(response.statusCode).toEqual(200)
      expect(response.body.length).toEqual(projects.length - 1)
    })
  })
})