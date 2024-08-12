import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<null | string>(null)

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
        else {
            setError("Title is required")
        }
    }

    return <div>
        <TextField
            value={newTaskTitle}
            onChange={onTaskTitleChangeHandler}
            onKeyPress={onKeyPressHandler}
            // className={error ? "error" : ""}
            size={"small"}
            variant={"standard"}
            label={"Type value"}
            error={!!error}
            helperText={error}
        />
        <IconButton
            onClick={addTask}
            color={"primary"}
        >
            <ControlPoint/>
        </IconButton>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
