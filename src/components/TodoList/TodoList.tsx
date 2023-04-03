import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import Button from "../Button";
import s from "./TodoList.module.css"
import {FilterValuesType} from "../../App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(newTaskTitle)
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTask()

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3> {props.title} </h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.length ? props.tasks.map((task: TaskType) => {
                    const removeTask = () => props.removeTask(task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>✖</button>
                        </li>
                    )
                }) : <span>Your taskslist is empty</span>}
            </ul>
            <div>
                <Button name={"All"} callBack={onAllClickHandler}/>
                <Button name={"Active"} callBack={onActiveClickHandler}/>
                <Button name={"Completed"} callBack={onCompletedClickHandler}/>
            </div>
        </div>
    );
};

export default TodoList;