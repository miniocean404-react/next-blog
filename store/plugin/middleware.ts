// import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV === 'development') middlewares.push()

export default middlewares
