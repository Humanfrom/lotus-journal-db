const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const corsMiddleware = require('./middleware/cors.middleware');

const authRouter = require("./routes/auth.routes")
const studentsRouter = require("./routes/students.routes")

const app = express();
const PORT = config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json())
app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));

        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        });
    } catch (e) {

    }
}

start();