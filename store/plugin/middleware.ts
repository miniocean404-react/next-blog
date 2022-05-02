import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]

// 添加判断是否是浏览器环境
if (process.env.NODE_ENV === 'development' && process.title === 'browser') {
  // @ts-ignore
  middlewares.push(createLogger())
}

export default middlewares
