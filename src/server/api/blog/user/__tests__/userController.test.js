// @flow

import request from 'supertest-as-promised'
import app from '../../../../index'

describe('[  USER CRUD  ]', () => {
  const user = {
    username: 'txiverke',
    password: 'testing'
  }

  describe('READ users', () => {
    it('should return a list of users', async () => {
      const signin = await request(app)
        .post('/auth/signin')
        .send(user)
        .set('Content-Type', 'application/json')

      const token = signin.body.token

      const response = await request(app)
        .get('/api/blog/users')
        .set('access-token', token)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array)
    })
  })
})