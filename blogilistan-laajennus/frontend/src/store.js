import { configureStore } from '@reduxjs/toolkit'
import popupReducer from './reducers/popupReducer'

const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
})

export default store
