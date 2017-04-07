import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import user from './api/user'
import login from './api/login'

const app = express()

app.use(bodyParser())
app.use(session({ 
  secret: 'shuang ge hen shuai.', 
  cookie: { secure: false },
  resave: false,
}))

app.use('/user', user)
app.use('/login', login)

export default app