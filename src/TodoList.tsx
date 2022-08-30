import axios from 'axios';
import { ChangeEvent } from 'react';
import Todo from './Todo';

export interface params {
    todos:Todo[];
    fillEditTodo:(todo:Todo) => void;
    deleteTodo:(id:number) => void;
}

function TodoList(params:params) {

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>title</th>
                    <th>completed</th>
                    <th>options</th>
                </tr>
            </thead>
            <tbody>
                {
                    params.todos.map((todo) => {
                        return(
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td><input type="checkbox" defaultChecked={!todo.completed}/></td>
                                <td><button onClick={() => params.fillEditTodo(todo)}>edit</button><button onClick={() => params.deleteTodo(todo.id)}>delete</button></td>
                            </tr>
                        )})
                }
            </tbody>
            
        </table>
    );
}

export default TodoList;