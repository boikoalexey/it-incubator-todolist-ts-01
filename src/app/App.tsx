import React, { useCallback, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Container,
    LinearProgress,
    CircularProgress
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { ErrorSnackbar } from '../components/common/ErrorSnackbar/ErrorSnackbar'
import { initializeAppTC, RequestStatusType } from './app-reducer'
import { TodolistsList } from '../components/Todolists/TodolistsList'
import { Route, Routes, Link, Navigate } from 'react-router-dom'
import { Login } from '../components/Login/Login'
import { logoutTC } from '../components/Login/auth-reducer'

const theme = createTheme()

const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{ marginTop: '50px' }}>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path="*" element={<Navigate to="/404"/>} />
                </Routes>
            </Container>
        </ThemeProvider>
    )
}

export default App
