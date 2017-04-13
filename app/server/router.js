import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import user from './api/user'
import login from './api/login'
import groups from './api/groups'
import config from './config'

const app = express()

app.use(bodyParser())
app.use(session({ 
  secret: 'shuang ge hen shuai.', 
  cookie: { secure: false },
  resave: false,
}))

app.use('/', express.static(config.static))
app.use('/dist', express.static(config.dist))
app.use('/user', user)
app.use('/login', login)
app.use('/groups', groups)

export default app