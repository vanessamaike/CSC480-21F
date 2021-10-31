import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import coursesReducer from '../features/coursesSlice'

    const store =  configureStore({
    reducer: {
        coursesReducer,
        userReducer,
    }
})
export default store