import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import user from './api/user'
import login from './api/login'

const app = express()

app.use(session({ secret: 'shuang ge hen shuai.', cookie: { maxAge: 60 * 1000 }}))
app.use(bodyParser())

app.use('/user', user)
app.use('/login', login)

export default app