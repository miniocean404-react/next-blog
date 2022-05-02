import rootReducer from '@/store/reducers'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root', // 必须有的
  storage, // 缓存机制
  // blacklist: ['loginStatus'] reducer 里不持久化的数据,除此外均为持久化数据
  // whitelist: ['loginStatus'], // reducer 里持久化的数据,除此外均为不持久化数据
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
