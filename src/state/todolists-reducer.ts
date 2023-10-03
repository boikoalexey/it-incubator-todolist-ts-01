import { todolistAPI, TodolistType } from '../api/todolist-api'
import { Dispatch } from 'react'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [ { ...action.todolist, filter: 'all' }, ...state ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
        default:
            return state
    }
}

// actions
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter } as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: 'SET-TODOLISTS', todolists } as const)

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.updateTodolist(todolistId, newTodolistTitle).then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
    })
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
