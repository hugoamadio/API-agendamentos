import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

//Routes

//

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`Server running in port: ${PORT}`)
})