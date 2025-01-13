let express = require('express')
let app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000

require('dotenv').config()

let db, 
dbConnectionStr = process.env.DB_STRING,
dbName = 'CoffeeTracker'

MongoClient.connect(dbConnectionStr)
.then(client => {
    console.log(`Conected to ${dbName} Database`)
    db = client.db(dbName)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.listen(PORT)

app.get('/', (request, response)=>{
    db.collection('coffeeData').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.log(error))
})

app.post('/coffee', (request, response) => {
    db.collection('coffeeData').insertOne({
        coffeeBrand: request.body.coffeeBrand, 
        roastType: request.body.roastType, 
        coffeeForm:  request.body.coffeeForm,
        coffeeOrigin: request.body.coffeeOrigin,
        brewingMethod: request.body.brewingMethod,
        coffeeFlavor: request.body.coffeeFlavor,
        brewTime: request.body.brewTime
    })
    .then(result => {
        console.log('Coffee Added')
        response.redirect('/')
    })
    .catch(error => console.log(error))
})