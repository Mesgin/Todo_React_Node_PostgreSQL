const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'todo',
        user: 'mo',
        password: ''
    }
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    knex.select().from('todos').then(function (data) {
        res.json(data)
    })
})

app.post('/', (req, res) => {
    let { description } = req.body
    knex('todos').insert({
        description
    }).then(() => {
        knex.select().from('todos').then(function (data) {
            res.json(data)
        })
    })

})

app.put('/', (req, res) => {
    let { id, completed } = req.body
    knex('todos').where('id', id).update({ completed: completed })
        .then(function (data) {
            res.json(data)
        })
})

app.delete('/', (req, res) => {
    let { id } = req.query
    knex('todos').where('id', id).del().then()
})

app.delete('/delete-all', (req, res) => {
    let { completed } = req.query
    knex('todos').where('completed', completed).del().then()
})



app.listen(8080, () => {
    console.log(8080)
})