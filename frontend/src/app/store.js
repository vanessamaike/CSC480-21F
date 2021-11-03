import {  configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import coursesReducer from '../features/coursesSlice'
import pdfReducer from '../features/pdfSlice'
    const store =  configureStore({
    reducer: {
        coursesReducer,
        userReducer,
        pdfReducer
    }
})
export default store