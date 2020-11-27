const express = require('express');
const app = express()
const port = 5000

// const userRouter = require('./src/routers/user');
const utilsRouter = require('./src/routers/uilities')
const categoriesRoomRouter = require('./src/routers/categoriesRoom')
const categoriesQuanRouter = require('./src/routers/categoriesDistrict')
const roomRouter = require('./src/routers/room')
const roleRouter = require('./src/routers/role')
const peopleRouter = require('./src/routers/peopleRouter')


// cấu hình bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// kết nối mongoose (database)
const connectDB = require('./src/config/config')
connectDB();

app.get('/', (req, res) => res.send('Hello World!'))
// app.use(userRouter)
app.use(utilsRouter)
app.use(categoriesRoomRouter)
app.use(categoriesQuanRouter)
app.use(roomRouter)
app.use(roleRouter)
app.use(peopleRouter)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))