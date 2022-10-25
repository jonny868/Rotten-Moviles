const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000



app.use(cors())
app.use(express.json());
require("../Backend/models/db")

app.use('/api', require('../Backend/routes/routes'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))