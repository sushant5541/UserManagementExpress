const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')
const connectDB = require('./config/database')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json())


app.use('/api/users', userRoute)

app.listen(PORT, ()=> {
    console.log(`Running on http://localhost: ${PORT}`)
    
})



