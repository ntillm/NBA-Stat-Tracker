const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001
require('dotenv').config()
const apiKey = process.env.API_FOOTBALL_KEY

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

app.get('/api/leagues', async (req, res) =>  {
  try {
    const response = await fetch('https://v2.nba.api-sports.io/leagues', {
      method: 'GET',
      headers: { 
        'x-rapidapi-host': 'v2.nba.api-sports.io',
        'x-rapidapi-key': apiKey
      }
    })

    const data = await response.json()
    res.json(data)
  } catch(error) {
    console.error('Error fetching leagues', error)
    res.status(500).json({ error: 'Failed to fetch leagues' })
  }
})

app.get('/api/players/search', async (req, res) => {
  const playerName = req.query.search || 'james'
  try {
    const response = await fetch(`https://v2.nba.api-sports.io/players?search=${playerName}`, {
      method: 'GET',
      headers: {
       'x-rapidapi-host': 'v2.nba.api-sports.io',
       'x-rapidapi-key': apiKey
      }
    })
    
    const data = await response.json()
    res.json(data)
  
  } catch(error) {
    console.error('Error fetching players', error)
    res.status(500).json({ error: 'Failed to fetch player'})
  }
})

app.get('/api/players/:id', async (req, res) => {
  const playerId = req.params.id
  try {
    const response = await fetch(`https://v2.nba.api-sports.io/players?id=${playerId}`, {
      method: 'Get', 
      headers: {
        'x-rapidapi-host': 'v2.nba.api-sports.io',
        'x-rapidapi-key' : apiKey
      }
    })
    
    const data = await response.json()
    res.json(data)

  } catch(error) {
    console.error('Error fetching player ID', error)
    res.status(500).json({ error: 'Failed to fetch player ID' })
  }
})
