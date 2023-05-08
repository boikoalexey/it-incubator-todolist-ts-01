import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleACActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title: string
    todolistId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleACActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(s => s.id === action.taskId ? { ...s, isDone: action.isDone } : s)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? { ...t, title: action.title } : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]:[]}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleACActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone}
}
