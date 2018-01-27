module.exports = () => (err, req, res, next) => {
  switch (err.status) {
    case '400':
      return res.status(err.status).json({ error: 'Something went wrong.' })
      break
    case '500':
      return res.status(err.status).json({ error: 'Internal server error, try it later' })
      break
    default:
      return res.status(500).json({ error: 'Internal server error, try it later' })
  }
}
