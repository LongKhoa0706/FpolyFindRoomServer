const express = require('express')
// const dbinit = require('./src/includes/dbInit')
const app = express()
const port = 8080

const generalRouter = require('./src/routers/index')

// cấu hình bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// kết nối mongoose (database)
const connectDB = require('./src/config/config')
connectDB();

app.get('/', (req, res) => res.send('Hello World!'))
app.use(generalRouter)
app.listen(port, () => console.log(`Server listing port: ${port}`))