import { FilterValuesType, TodolistType } from '../AppWithRedux'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter:  FilterValuesType
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: Array<TodolistType> = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = { id: action.todolistId, title: action.title, filter: 'all' }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(f => f.id === action.id ? { ...f, title: action.title } : f)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(f => f.id === action.id ? { ...f, filter: action.filter } : f)
        default:
            return state
    }
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1() }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle }
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newFilter }
}