import React, { useEffect, useState } from 'react'
import { TaskType, todolistAPI, TodolistType, UpdateTaskModelType } from '../../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [ state, setState ] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolist().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [ state, setState ] = useState<any>(null)

    useEffect(() => {
        todolistAPI.createTodolist('SOME TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [ state, setState ] = useState<any>(null)
    let todolists: Array<TodolistType> = []

    useEffect(() => {
        (async () => {
            await todolistAPI.getTodolist().then((res) => {
                todolists = res.data
            })
            await todolistAPI.deleteTodolist(todolists[0].id).then((res) => {
                setState(res.data)
            })
        })()
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null)
    let todolists: Array<TodolistType> = []

    useEffect(() => {
        (async () => {
            await todolistAPI.getTodolist().then((res) => {
                todolists = res.data
            })
            await todolistAPI.updateTodolist(todolists[0].id, 'SOME NEW TITLE').then((res) => {
                setState(res.data)
            })
        })()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [ state, setState ] = useState<any>(null)

    useEffect(() => {
        const todolistId = '4ce8eb9e-3c2e-42f1-a182-1dc1295add5d'
        todolistAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [ state, setState ] = useState<any>(null)

    useEffect(() => {
        const todolistId = '4ce8eb9e-3c2e-42f1-a182-1dc1295add5d'
        todolistAPI.createTask(todolistId, 'SOME TASK TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [ state, setState ] = useState<any>(null)
    const todolistId = '4ce8eb9e-3c2e-42f1-a182-1dc1295add5d'
    let tasks: TaskType[]

    useEffect(() => {
        (async () => {
            await todolistAPI.getTasks(todolistId).then((res) => {
                tasks = res.data.items
            })
            await todolistAPI.deleteTask(todolistId, tasks[0].id).then((res) => {
                setState(res.data)
            })
        })()
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [ state, setState ] = useState<any>(null)
    const todolistId = '4ce8eb9e-3c2e-42f1-a182-1dc1295add5d'

    useEffect(() => {
        (async () => {
            await todolistAPI.getTasks(todolistId).then(async (res) => {
                const tasks: TaskType[] = res.data.items
                const model: UpdateTaskModelType = {
                    description: tasks[0].description,
                    deadline: tasks[0].deadline,
                    priority: tasks[0].priority,
                    startDate: tasks[0].startDate,
                    status: tasks[0].status,
                    title: tasks[0].title
                }
                await todolistAPI.updateTask(todolistId, tasks[0].id, model).then((res) => {
                    setState(res.data)
                })
            })
        })()
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

