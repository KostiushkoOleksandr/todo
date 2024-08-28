import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import Delete from '@mui/icons-material/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitle: (taskId: string, newValue: string, todolistId: string) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h1>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" size="large" onClick={deleteTodolist}>
                    <Delete />
                </IconButton>
            </h1>
                <AddItemForm addItem={addTask} />
            {
                props.tasks.map(el => {

                    const onDeleteHandler = () => {
                        props.deleteTask(el.id, props.id)
                    }

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTitle(el.id, newValue, props.id)
                    }
                    return <div key={el.id}>
                        <Checkbox
                            className={el.isDone ? "is-done" : ""}
                            // type="checkbox"
                            onChange={onChangeStatusHandler}
                            checked={el.isDone}
                        />
                        <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" size="large" onClick={onDeleteHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} size={"small"} onClick={onAllClickHandler}>all
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"} size={"small"}
                        onClick={onActiveClickHandler}>active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"} size={"small"}
                        onClick={onCompletedClickHandler}>completed
                </Button>
            </div>

        </div>
    )
}
