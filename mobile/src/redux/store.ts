import { createStore, applyMiddleware } from 'redux'
// import configureStore from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))

export { store };