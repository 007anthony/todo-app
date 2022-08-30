import { ChangeEvent, FormEvent, useState } from "react";
import Todo from "../Todo";

export interface params {
    todo:Todo;
    editTodo:(todo:Todo) => void;
}

function EditTodo(params:params) {

    function onSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        params.editTodo(params.todo)
    }

    function onChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        params.todo.title = event.target.value;
        
    }

    return(
        <form onSubmit={onSubmit}>
            <input type="text" name="title" defaultValue={params.todo.title} onChange={onChange}/>
            <input type="submit"/>
        </form>
    );
}

export default EditTodo;