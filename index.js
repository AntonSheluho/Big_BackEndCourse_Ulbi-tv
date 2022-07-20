const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter.js')

const PORT = process.env.POTR || 5000
const URL = 'mongodb+srv://auth_roles:H7cfcd2Fjybcxt0C@cluster0.qovee.mongodb.net/?retryWrites=true&w=majority';
const URL2 ='mongodb+srv://auth:z4fze8Vo8TrO8MPE@cluster0.vwr04.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(URL2)
        app.listen(PORT, () => console.log(`Server was started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()