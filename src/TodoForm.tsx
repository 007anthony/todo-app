import { ChangeEvent, FormEvent, useState } from "react";
import Todo from "./Todo";

export interface params {
    addTodo:(todo:Todo) => void;
}


function CreateTodo(params:params) {

    const [id, setId] = useState(1);

    const [todo, setTodo] = useState(new Todo(0, "", false));

    function createTodo(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        todo.id = id;
        params.addTodo(todo);
        setId(id + 1);
        console.log("added Todo");
    }

    function onChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setTodo({...todo, [name]:value});
    }


    return(
        <form onSubmit={createTodo}>
            <input type="text" name="title" onChange={onChange}/>
            <input type="checkbox" name="checked" onChange={onChange}/>
            <input type="submit"/>
        </form>
    );

}

export default CreateTodo;