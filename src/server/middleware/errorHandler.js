// @flow

export default (err: Object, res: Object) => {
  if (err && err.name && err.name === 'UnauthorizedError') {
    return res.status(401).send('Invalid token')
  }

  console.log(err)

  switch (err.status) {
    case '400':
      return res.status(err.status).send('Something went wrong.')
    case '404':
      return res.status(err.status).send('404, Not Found.')
    case '500':
      return res.status(err.status).send('Internal server error, try it later.')
    default:
      return res.status(500).send('Internal server error, try it later.')
  }
}
