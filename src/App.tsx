import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import TodoList from './TodoList';
import CreateTodo from './Forms/AddTodoForm';
import axios from 'axios';
import EditTodo from './Forms/EditTodoForm';

function App() {

    const [todos, setTodos] = useState(new Array<Todo>());
    const [todo, setTodo] = useState(new Todo(0, "", false));

    useEffect(() => {
      axios.get("http://localhost:3000/tasks").then((todos) => {
        setTodos(todos.data);
      })
    }, [todos.length]);

    function createTodo(todo:Todo) {
        todo.id = todos.length + 1;
        setTodos([...todos, todo]);
        axios.post("http://localhost:3000/tasks", todo).then(() => {
          window.location.reload();
        });
    }

    function editTodo(todo:Todo) {

      axios.put("http://localhost:3000/tasks", todo).then(() => {
        window.location.reload();
      });

    }

    function fillEditForm(todo:Todo) {
      console.log(todo);
      setTodo(todo);
    }

    function deleteTodo(id:number) {
      let newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
      axios.delete("http://localhost:3000/task/" + id);

    }

    function login(email:string, password:string) {
      axios.post("http://localhost:3000/auth/cookie/login", {"email":email, "password":password}).then();
    }

  return(
    <div className="App">
        <TodoList todos={todos} fillEditTodo={fillEditForm} deleteTodo={deleteTodo}></TodoList>
        <CreateTodo addTodo={createTodo}></CreateTodo>
        <EditTodo todo={todo} editTodo={editTodo} ></EditTodo>
    </div>
  );
}

export default App;
