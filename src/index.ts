import express from 'express'
import * as dotenv from 'dotenv'
import schedulesRoutes from './routes/schedules.routes'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

//Routes

app.use("/scheduling", schedulesRoutes())

//


app.listen(PORT, ()=> {
    console.log(`Server running in port: ${PORT}`)
})