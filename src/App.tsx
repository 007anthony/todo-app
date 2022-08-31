import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import TodoList from './TodoList';
import CreateTodo from './Forms/AddTodoForm';
import axios from 'axios';
import EditTodo from './Forms/EditTodoForm';
import LoginForm from './Forms/LoginForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

    const [todos, setTodos] = useState(new Array<Todo>());
    const [todo, setTodo] = useState(new Todo(0, "", false));
    const [token, setToken] = useState("");

    useEffect(() => {
      axios.get("http://localhost:3000/tasks").then((todos) => {
        setTodos(todos.data);
      })
    }, [todos.length]);

    function createTodo(todo:Todo) {
        todo.id = todos.length > 0? todos.length: 1;
        console.log(todo);
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
      axios.delete("http://localhost:3000/task/" + id).then(() => {
        window.location.reload();
      });

    }

    function login(email:string, password:string) {
      axios.post("http://localhost:3000/auth/jwt/sign", {"email":email, "password":password}).then((response) => {
        setToken(response.data.token);
      });
    }

  return(
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/'></Route>
          <TodoList todos={todos} fillEditTodo={fillEditForm} editTodo={editTodo} deleteTodo={deleteTodo}></TodoList>
        </Switch>
        <Switch>
          <Route path='/todo/add'></Route>
          <CreateTodo addTodo={createTodo}></CreateTodo>
        </Switch>
        <Switch>
          <Route path="/todo/edit"></Route>
          <EditTodo todo={todo} editTodo={editTodo} ></EditTodo>
        </Switch>
        <Switch>
          <Route path="/login"></Route>
          <LoginForm login={login}></LoginForm>
        </Switch>
      </BrowserRouter>
        
        
        
        
    </div>
  );
}

export default App;
