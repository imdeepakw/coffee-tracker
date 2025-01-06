let express = require('express')
let app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000

require('dotenv').config()

let db, 
dbConnectionStr = process.env.DB_STRING,
dbName = 'coffeeTracker'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
.then(client => {
    console.log(`Conected to ${dbName} Database`)
    db = client.db(dbName)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT)