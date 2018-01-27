import request from 'supertest-as-promised'
import '../config/environment'

import express from '../config/express'
import mongoose from '../config/mongoose'

const app = express()
// eslint-disable-next-line
const db = mongoose()

const expectedProps = ['_id', 'firstName', 'lastName', 'email', 'username']
const id = '590ce628f36d2804514b5343'

describe('USER API', () => {
  describe(`GET ${'/api/user/:userId'} - Read one users`, () => {
    test('should return an obj', () =>
      request(app)
        .get(`/api/user/${id}/`)
        .expect(200)
        .then(res => expect(res.body).toBeInstanceOf(Object)),
    )

    test('should return an obj with a type of props', () =>
      request(app)
        .get(`/api/user/${id}/`)
        .expect(200)
        .then((res) => {
          const user = res.body
          expectedProps.forEach(key => expect(Object.keys(user)).toContain(key))
          expect(typeof user._id).toBe('string')
          expect(typeof user.firstName).toBe('string')
          expect(typeof user.lastName).toBe('string')
          expect(typeof user.email).toBe('string')
          expect(typeof user.username).toBe('string')
        }),
    )

    test('should return a 404 for a nonexistant id', () =>
      request(app)
        .get('/api/user/-25')
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('Failed to load user: -25.')
        }),
    )
  })
})
