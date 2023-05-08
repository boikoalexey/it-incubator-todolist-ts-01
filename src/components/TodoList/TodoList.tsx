import React, {ChangeEvent} from 'react'
import AddItemForm from "../AddItemForm"
import {FilterValuesType} from "../../App";
import {EditableSpan} from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    addItem: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodoList: (todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean ) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string ) => void
    changeTodolistTitle: (todolistId: string, newTitle: string ) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all")
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed")
    const addTask = (title: string) => props.addItem(title, props.todolistId)
    const removeTodoList = () => props.removeTodoList(props.todolistId)
    const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.todolistId, newTitle)
    }

    return (
        <div>
            <h2>
                <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h2>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.length ? props.tasks.map((task: TaskType) => {
                    const removeTask = () => props.removeTask(task.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, task.id, newTitle)
                    }
                    return (
                        <div key={task.id} className={task.isDone ? "is-done" : ""}>
                            <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={task.title} onChangeTitle={onChangeTitleHandler}/>
                            <IconButton onClick={removeTask} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    )
                }) : <span>Your taskslist is empty</span>}
            </div>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text"}
                    name={"All"} onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === "active" ? "contained" : "text"}
                    name={"Active"} onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === "completed" ? "contained" : "text"}
                    name={"Completed"} onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );

};

export default TodoList;