import { ChangeEvent, FormEvent, useState } from "react";
import Todo from "../Todo";

export interface params {
    addTodo:(todo:Todo) => void;
}


function CreateTodo(params:params) {

    const [id, setId] = useState(1);

    const [todo, setTodo] = useState(new Todo(1, "", false));

    function createTodo(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        params.addTodo(todo);
        console.log("added Todo");
    }

    function onChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setTodo({...todo, [name]:value});
        console.log(todo);
    }


    return(
        <form onSubmit={createTodo}>
            <input type="text" name="title" onChange={onChange}/>
            <input type="submit"/>
        </form>
    );

}

export default CreateTodo;