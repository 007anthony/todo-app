import { FormEvent } from 'react';
import Todo from './Todo';

export interface params {
    todos:Todo[];
    deleteTodo:(id:number) => void;
}


function TodoList(params:params) {

    function editTodo(event) {

    }

    function deleteTodo(event:FormEvent<HTMLButtonElement>) {

    }
    
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
                    params.todos.map((user) => {
                        return(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.title}</td>
                                <td><input type="checkbox" defaultChecked={user.completed}/></td>
                                <td><button onClick={editTodo}>edit</button><button onClick={deleteTodo}>delete</button></td>
                            </tr>
                        )})
                }
            </tbody>
            
        </table>
    );
}

export default TodoList;