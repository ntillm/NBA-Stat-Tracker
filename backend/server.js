const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

