import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import {TaskType} from './components/TodoList/TodoList';
import AddItemForm from "./components/AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (newTaskTitle: string, todolistId: string) => dispatch(addTaskAC(newTaskTitle, todolistId))
    const removeTask = (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId))
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => dispatch(changeTaskTitleAC(taskId, title, todolistId))
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    const addTodolist = (title: string) => dispatch(addTodolistAC(title))
    const removeTodolist = (todolistId: string) => dispatch(removeTodolistAC(todolistId))
    const changeTodolistTitle = (todolistId: string, title: string) => dispatch(changeTodolistTitleAC(todolistId, title))
    const changeTodolistFilter = (todolistId: string, value: FilterValuesType) => dispatch(changeTodolistFilterAC(todolistId, value))

    return (
        <div className="App">
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
            </AppBar>
            <Container fixed style={{marginTop: '50px'}}>
                <Grid container style={{margin: '0 0 20px 10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            const getFilteredTasks = (tasks: Array<TaskType>) => {
                                switch (tl.filter) {
                                    case "active":
                                        return tasks.filter((task: TaskType) => !task.isDone)
                                    case "completed":
                                        return tasks.filter((task: TaskType) => task.isDone)
                                    default:
                                        return tasks
                                }
                            }
                            const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id])

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={filteredTasks}
                                        addItem={addTask}
                                        removeTask={removeTask}
                                        removeTodoList={removeTodolist}
                                        changeFilter={changeTodolistFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;