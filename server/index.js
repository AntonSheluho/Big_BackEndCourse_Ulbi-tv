require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParse = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routers/index.js');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000
const URL = process.env.DB_URL

const app = express();

app.use(express.json());
app.use(cookieParse());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router)
app.use(errorMiddleware);  // миделвеер ошибки всегда в конце

const start = async () => {
    try {
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log(`Server work on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()