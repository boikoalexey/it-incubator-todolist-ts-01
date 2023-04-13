import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import Button from "../Button";
import s from "./TodoList.module.css"
import { FilterValuesType } from "../../App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeFilter: (value: FilterValuesType) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        event.key === 'Enter' && addTask()
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3> {props.title} </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.length ? props.tasks.map((task: TaskType) => {
                    const removeTask = () => props.removeTask(task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>✖</button>
                        </li>
                    )
                }) : <span>Your taskslist is empty</span>}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    name={"All"} onClick={onAllClickHandler}>All</button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    name={"Active"} onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    name={"Completed"} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;