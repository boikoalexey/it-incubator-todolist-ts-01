import { Grid, Paper } from '@material-ui/core'
import AddItemForm from '../common/AddItemForm/AddItemForm'
import Todolist from './Todolist/Todolist'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTodolistTC, changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC, TodolistDomainType
} from '../../state/todolists-reducer'
import { AppRootStateType } from '../../state/store'
import { Navigate } from 'react-router-dom'

export const TodolistsList: React.FC = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(()=> {
        if (!isLoggedIn) return
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [ dispatch ])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [ dispatch ])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [ dispatch ])

    const changeTodolistFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [ dispatch ])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return <>
        <Grid container style={{ margin: '0 0 20px 10px' }}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={5}>
            {
                todolists.map((tl) => {
                    return <Grid item key={tl.id}>
                        <Paper style={{ padding: '10px' }}>
                            <Todolist
                                key={tl.id}
                                todolistId={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                removeTodoList={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                                changeFilter={changeTodolistFilter}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
