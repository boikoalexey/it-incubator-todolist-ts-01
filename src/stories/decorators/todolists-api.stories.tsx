import React, { useEffect, useState } from 'react'
import { todolistAPI, TodolistType } from '../api/todolist-api'


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
    // @ts-ignore
    useEffect(async () => {
        await todolistAPI.getTodolist().then((res) => {
            todolists = res.data
        })
        await todolistAPI.deleteTodolist(todolists[0].id).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null)
    let todolists: Array<TodolistType> = []
    // @ts-ignore
    useEffect(async () => {
        await todolistAPI.getTodolist().then((res) => {
            todolists = res.data
        })
        await todolistAPI.updateTodolist(todolists[0].id, 'SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

