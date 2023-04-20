import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import {TaskType} from './components/TodoList/TodoList';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "completed"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let updateTodolists = todolists.find(t => t.id === todoListId)
        if (updateTodolists) {
            updateTodolists.filter = value
        }
        setTodolists([...todolists]);
    }

    const removeTask = (id: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const removeTodoList = (todoListId: string) => {
        todolists = todolists.filter(t => t.id !== todoListId)
        setTodolists([...todolists])
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const addTask = (newTaskTitle: string, todoListId: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        tasks[todoListId] = [newTask, ...tasks[todoListId]]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let task = tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks});
    }

    return (
        <div className="App">
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

                    return <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
