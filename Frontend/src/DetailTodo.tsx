import Todo from "./Todo";

export interface params {
    todo:Todo;
}

function DetailTodo(params:params) {
    return(
        <table>
            <tbody>
                <tr>
                    <td>ID</td>
                    <td>{params.todo.id}</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>{params.todo.title}</td>
                </tr>
                <tr>
                    <td>completed</td>
                    <td>{String(params.todo.completed)}</td>
                </tr>
            </tbody>
        </table>
        
    );
}

export default DetailTodo;