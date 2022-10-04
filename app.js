const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rolesRouter = require("./routes/roles");
const authRouter  = require("./routes/auth");
const centreRouter = require("./routes/centres");
const programmeRouter = require("./routes/programme");
const subjectRouter = require("./routes/subjects");
const informationRouter = require("./routes/information");
const namespaceRouter = require("./routes/namespace");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/message");
const profileRouter = require("./routes/profile");


const app = express();

// database connection
const connectDB = require("./config/db");
connectDB()
    .then()
    .catch()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/auth", authRouter);
app.use("/api/centres", centreRouter);
app.use("/api/programmes", programmeRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/info", informationRouter);
app.use("/api/namespace", namespaceRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/messages", messageRouter);
app.use("/api/profile", profileRouter);

module.exports = app;
