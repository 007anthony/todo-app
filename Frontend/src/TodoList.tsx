import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Todo from './Todo';

export interface params {
    todos:Todo[];
    fillEditTodo:(todo:Todo) => void;
    deleteTodo:(id:number) => void;
    editTodo:(todo:Todo) => void;
    logout:() => void;
}

function TodoList(params:params) {

    function toggleCompleted(event:ChangeEvent<HTMLInputElement>, todo:Todo) {
        todo.completed = event.target.checked;
        console.log(todo);
        params.editTodo(todo);
        
    }

    return(
        <div>
            <ul>
                <li><Link to="/create">Create ToDo</Link></li>
                <li><Link to="/edit">Edit ToDo</Link></li>
                <li><a href="javascript:void(0)" onClick={params.logout}>logout</a></li>
            </ul>
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
                                <td><Link to={"/todo?id=" + todo.id}>{todo.title}</Link></td>
                                <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => toggleCompleted(event, todo)}/></td>
                                <td><Link to={"/edit?id=" + todo.id}>edit</Link><a href='javascript:void'onClick={() => params.deleteTodo(todo.id)}>delete</a></td>
                            </tr>
                        )})
                }
            </tbody>
            
        </table>
        </div>
       
    );
}

export default TodoList;