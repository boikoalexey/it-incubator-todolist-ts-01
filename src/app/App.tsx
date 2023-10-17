import React, { useCallback, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Todolist from '../components/Todolists/Todolist/Todolist'
import AddItemForm from '../components/common/AddItemForm/AddItemForm'
import { AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper, LinearProgress } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../state/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { TaskType } from '../api/todolist-api'
import { ErrorSnackbar } from '../components/common/ErrorSnackbar/ErrorSnackbar'
import { RequestStatusType } from './app-reducer'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const theme = createTheme()

const App = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(()=> {
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

    return (
        <ThemeProvider theme={theme}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{ marginTop: '50px' }}>
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
            </Container>
        </ThemeProvider>
    )
}

export default App
