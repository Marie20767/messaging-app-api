// Require is essentially the same as import
// Imports
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./queries')

// Express is a node.js web server framework to make it easier to make API requests
const app = express()
const port = 3001

// App.use: for middleware
// Giving data back into a body object
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// To allow data sharing between different local hosts during development phase
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/users', database.getUsers)
app.get('/users/:id', database.getUserById)
app.get('/friends/:id', database.getFriends)
app.get('/messages/:id', database.getMessages)
app.post('/users', database.createUser)
app.post('/login', database.loginUser)
app.post('/add_friend', database.addNewFriend)
app.put('/users/:id', database.updateUser)
app.delete('/users/:id', database.deleteUser)


// Get the app to listen to start listening to any https requests on the port you specify
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
