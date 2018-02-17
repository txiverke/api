import request from 'supertest'

import router from '../postRoutes'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(router).get('/')
    expect(response.statusCode).toBe(200)
  })
})
