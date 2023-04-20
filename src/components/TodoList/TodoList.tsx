import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import Button from "../Button";
import s from "./TodoList.module.css"
import { FilterValuesType } from "../../App";

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
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
            props.addTask(newTaskTitle, props.todoListId)
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

    const onAllClickHandler = () => props.changeFilter("all", props.todoListId)
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    return (
        <div>
            <h3> {props.title} <button onClick={removeTodoList}>✖</button> </h3>
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
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
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