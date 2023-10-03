import React from 'react'
import { Provider } from 'react-redux'
import { AppRootStateType } from '../../state/store'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from '../../state/tasks-reducer'
import { todolistsReducer } from '../../state/todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
