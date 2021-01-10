require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database/db')
const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const auth = require('./middleware/auth_middleware')
const socketModules = require('./socket')
require('./database/migration')



// app.use(express.static(__dirname  + '/public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(bodyParser.json({limit: '50mb'}));


// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.locals = require('./helpers/helper')


app.use(express.json())

app.use(cors())

// conect socket
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(port)

var categoryRouter = require('./routes/category')
var courseRouter = require('./routes/course')
var authRouter = require('./routes/auth')
var userRouter = require('./routes/user')


app.use('/api/categorys/', categoryRouter)
app.use('/api/courses/', courseRouter)
app.use('/api/auth/', authRouter)
app.use('/api/users/', auth, userRouter)


//Connect database
db.sync().then(function() {
     // { force: true }
  	console.log(`Server is listening on port ${port}`)
}).catch(function(err) {
  console.log(err)
  process.exit(1)
})


