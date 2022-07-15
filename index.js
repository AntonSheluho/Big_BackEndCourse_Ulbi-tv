const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

app.listen(PORT, () => {console.log(`Server was connect on POTR: ${PORT}`)})

app.get('/', (req, res) => {
    res.send('HELLO POSTGERT NODE.JS')
})