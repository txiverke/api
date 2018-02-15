import request from 'supertest-as-promised'
import '../config/environment'

import express from '../config/express'
import mongoose from '../config/mongoose'

const app = express()
// eslint-disable-next-line
const db = mongoose()

const expectedProps = ['_id', 'title', 'content', 'tags', 'date', 'comments']
let id

describe('POST API', () => {
  describe('GET /api/post/', () => {
    test('should return JSON array', () =>
      request(app).get('/api/post/').expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array)
        }),
    )

    test('should return obj with correct props', () =>
      request(app).get('/api/post/').expect(200)
        .then((res) => {
          const sampleKeys = Object.keys(res.body[0])
          expectedProps.forEach(key => expect(sampleKeys.includes(key)).toBe(true))
        }),
    )
  })

  describe('POST /api/post/ - Create one post', () => {
    const item = {
      title: 'Just a fake title',
      content: 'Just a fake content',
      tags: ['tag1', 'tag2'],
      date: '25/09/2017',
      comments: [{ key: 'value' }],
    }

    test('should accept and add a valid new item', () =>
      request(app).post('/api/post/').send(item).expect(200)
        .then((res) => {
          expect(res.body.post).toBeInstanceOf(Object)
          expect(res.body.success).toBe(true)
          expect(res.body.post.tags.length).toBe(2)
          expect(res.body.post.title).toEqual('Just a fake title')
          id = res.body.post._id
        }),
    )

    test('should not create a new item with wrong props', () => {
      const wrongItem = {
        tags: ['tag1', 'tag2'],
        date: '25/09/2017',
        comments: [{ key: 'value' }],
      }

      return request(app).post('/api/post/').send(wrongItem)
        .then((res) => {
          expect(res.body.message).toEqual('Failed to create post.')
          expect(res.body.success).toBe(false)
        })
    })
  })

  describe('GET /api/post/id/ - Get one item', () => {
    test('should return an obj of type Post', () =>
      request(app).get(`/api/post/${id}/`).expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Object)
          expect(res.body.tags.length).toBe(2)
        }),
    )
  })
})
