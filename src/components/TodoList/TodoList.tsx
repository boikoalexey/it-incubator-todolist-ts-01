import React, {ChangeEvent} from 'react'
import AddItemForm from "../AddItemForm"
import {FilterValuesType} from "../../AppWithRedux";
import {EditableSpan} from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";

export type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string ) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTask = (newTaskTitle: string) => dispatch(addTaskAC(newTaskTitle, props.todolistId))
    const removeTodoList = () => props.removeTodoList(props.todolistId)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.todolistId, newTitle)
    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all")
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed")

    const getFilteredTasks = (tasks: Array<TaskType>) => {
        switch (props.filter) {
            case "active":
                return tasks.filter((task: TaskType) => !task.isDone)
            case "completed":
                return tasks.filter((task: TaskType) => task.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks)

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
                {filteredTasks.length ? filteredTasks.map((task: TaskType) => {
                    const removeTask = () => dispatch(removeTaskAC(task.id, props.todolistId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(props.todolistId, task.id, e.currentTarget.checked))
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(props.todolistId, task.id, newTitle))
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