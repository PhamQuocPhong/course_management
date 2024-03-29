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
const fileUpload = require('express-fileupload');
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
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(cors())

// conect socket
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(port)
var promotionRouter = require('./routes/promotion')
var categoryRouter = require('./routes/category')
var courseRouter = require('./routes/course')
var authRouter = require('./routes/auth')
var profileRouter = require('./routes/profile')
var homeRouter = require('./routes/home')
var userRouter = require('./routes/user')
var chapterRouter = require('./routes/chapter')
var documentRouter = require('./routes/document')
var uploadRouter = require('./routes/upload')

app.use('/api/users/', auth, userRouter)
app.use('/api/categories/', categoryRouter)
app.use('/api/courses/',  courseRouter)
app.use('/api/chapters/', auth, chapterRouter)
app.use('/api/documents/', auth, documentRouter);

app.use('/api/promotions/', auth, promotionRouter)

app.use('/api/auth/', authRouter)
app.use('/api/profile/', auth, profileRouter)
app.use('/api/home/', homeRouter)
app.use('/api/upload/', uploadRouter);

app.use('/api/student/courses/', auth, courseRouter)
app.use('/api/student/profile/', auth, profileRouter)
app.use('/api/student/user/', auth, userRouter)


app.use('/api/teacher/courses/', auth, courseRouter);
app.use('/api/teacher/profile/', auth, profileRouter);



//Connect database
 /*db.sync().then(function() {
      // { force: true }
   	console.log(`Server is listening on port ${port}`)
 }).catch(function(err) {
   console.log(err)
  process.exit(1)
})*/


