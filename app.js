require('dotenv').config();
require('express-async-errors');
const cors = require('cors')

const express = require('express');
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')
const listsRouter = require('./routes/lists')
const app = express();

// database
const connectDB = require('./db/connect');
// authenticate user 
const auth = require("./middleware/authentication")
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("React Netflix Backend")
})
app.use('/api/auth', authRouter)
app.use('/api/users', auth, usersRouter)
app.use('/api/movies', auth, moviesRouter)
app.use('/api/lists', auth, listsRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
