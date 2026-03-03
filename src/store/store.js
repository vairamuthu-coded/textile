import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cartSliceReducer from './cardSlice'
import authSlice from '../redux/authSlice'
import postSlice from "../redux/postSlice"
import socketSlice from "../redux/socketSlice"
import chatSlice from "../redux/chatSlice"
import themeSliceReducer from './theme'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
export const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    cart: cartSliceReducer,
    auth: authSlice,
    theme: themeSliceReducer,
    post: postSlice,
    chat:chatSlice,
    socketio:socketSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: { ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
        })

})

