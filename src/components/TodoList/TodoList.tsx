import React, {ChangeEvent} from 'react'
import AddItemForm from "../AddItemForm"
import {FilterValuesType} from "../../App";
import {EditableSpan} from "../EditableSpan";

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    addItem: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean ) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string ) => void
    changeTodolistTitle: (todolistId: string, newTitle: string ) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const onAllClickHandler = () => props.changeFilter("all", props.todoListId)
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId)
    const addTask = (title: string) => props.addItem(title, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.todoListId, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} /> <button onClick={removeTodoList}>✖</button> </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.length ? props.tasks.map((task: TaskType) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todoListId, task.id, newTitle)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={task.title} onChangeTitle={onChangeTitleHandler} />
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