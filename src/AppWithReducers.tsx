import React, {useReducer} from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import {TaskType} from './components/TodoList/TodoList';
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTask = (newTaskTitle: string, todolistId: string) => {
        const action = addTaskAC(newTaskTitle, todolistId)
        dispatchToTasks(action)
    }

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatchToTodolists(action)
    }

    const changeTodolistFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

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

export default App;
