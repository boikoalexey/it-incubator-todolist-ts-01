import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import {TaskType} from './components/TodoList/TodoList';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle: string = "What to learn";
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all");
    const changeFilter = (value: FilterValuesType) => setFilter(value)

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter((task: TaskType) => !task.isDone)
            case "completed":
                return tasks.filter((task: TaskType) => task.isDone)
            default:
                return tasks
        }
    }

    const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id))
    const addTask = (newTaskTitle: string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks]);
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={filteredTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
