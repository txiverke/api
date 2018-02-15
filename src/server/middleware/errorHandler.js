module.exports = () => (err, req, res) => {
  switch (err.status) {
    case '400': return res.status(err.status).json({ error: 'Something went wrong.' })
    case '500': return res.status(err.status).json({ error: 'Internal server error, try it later' })
    default: return res.status(500).json({ error: 'Internal server error, try it later' })
  }
}
