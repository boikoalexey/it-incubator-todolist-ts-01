import { TasksStateType } from '../App'
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from '../api/todolist-api'
import { Dispatch } from 'react'
import { AppRootStateType } from './store'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
        case 'ADD-TASK':
            return <TasksStateType>{ ...state, [action.task.todoListId]: [ action.task, ...state[action.task.todoListId] ] }
        case 'UPDATE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].map(s => s.id === action.taskId ? { ...s, ...action.model } : s) }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolist.id]:[] }
        case 'REMOVE-TODOLIST':
            const copyState = { ...state }
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = { ...state }
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return { ...state, [action.todolistId]: action.tasks }
        default:
            return state
    }
}

// actions
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({ type: 'REMOVE-TASK', todolistId, taskId } as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({ type: 'UPDATE-TASK', todolistId, taskId, model } as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({ type: 'SET-TASKS', tasks, todolistId } as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTask(title, todolistId)
        .then((res) => dispatch(addTaskAC(res.data.data.item)))
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => dispatch(removeTaskAC(todolistId, taskId)))
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: task.title,
                ...domainModel
            }
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then(() => dispatch(updateTaskAC(todolistId, taskId, domainModel)))
        }
    }
}

// types
type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
