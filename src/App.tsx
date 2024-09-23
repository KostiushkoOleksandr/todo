import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "completed" | "active"
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function deleteTask(id: string, todolistId: string) {
        let task = tasks[todolistId]
        let filteredTasks = task.filter(el => el.id !== id);
        tasks[todolistId] = filteredTasks
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let task = tasks[todolistId]
        let newTasks = [newTask, ...task]
        tasks[todolistId] = newTasks
        return setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasks[todolistId]
        let taskChangeStatus = task.find(el => el.id === taskId)

        if (taskChangeStatus) {
            taskChangeStatus.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTitle(taskId: string, newValue: string, todolistId: string) {
        let task = tasks[todolistId]
        let taskChangeTitle = task.find(el => el.id === taskId)

        if (taskChangeTitle) {
            taskChangeTitle.title = newValue
            setTasks({...tasks})
        }
    }

    function deleteTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    type TaskStateType = {
        [key: string]: Array<TaskType>
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "Learn JS", filter: "all"},
        {id: todolistId2, title: "Learn React", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "1", isDone: false},
            {id: v1(), title: "2", isDone: true},
            {id: v1(), title: "3", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "4", isDone: false},
            {id: v1(), title: "5", isDone: true},
            {id: v1(), title: "6", isDone: true}
        ]
    })

    function addTodolist(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className='App'>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={6} style={{ paddingTop: "30px" }}>
                    {
                        todolists.map((tl) => {

                            let tasksFormTodolist = tasks[tl.id]

                            if (tl.filter === "completed") {
                                tasksFormTodolist = tasksFormTodolist.filter(el => el.isDone === true)
                            }
                            if (tl.filter === "active") {
                                tasksFormTodolist = tasksFormTodolist.filter(el => el.isDone === false)
                            }

                            return <Grid item>
                                <Paper elevation={3} style={{padding: "10px 30px 30px 30px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksFormTodolist}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeTitle={changeTitle}
                                        filter={tl.filter}
                                        deleteTodolist={deleteTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                            {
                            }
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}
export default App;
