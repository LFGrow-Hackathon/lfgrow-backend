const express = require("express")
const cors = require("cors");
const myLogger = require("./logger")
const routes = require("./routes/index")
const lens = require("./service/lens.js")
require('dotenv').config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json());
app.use(myLogger)

lens.setLensHub();

// routes
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Dispatcher listening at http://localhost:${process.env.PORT}`)
})
