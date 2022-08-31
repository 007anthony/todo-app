import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import TodoList from './TodoList';
import CreateTodo from './Forms/AddTodoForm';
import axios from 'axios';
import EditTodo from './Forms/EditTodoForm';
import LoginForm from './Forms/LoginForm';
import { BrowserRouter, Link, Navigate, Route, Router, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import DetailTodo from './DetailTodo';

function App() {

    const [todos, setTodos] = useState(new Array<Todo>());
    const [todo, setTodo] = useState(new Todo(0, "", false));
    const [token, setToken] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3000/auth/jwt/tasks", {"headers":{
        'Authorization':'Bearer ' + token
      }}).then((todos) => {
        setTodos(todos.data);
      })
    }, [token]);

    function createTodo(todo:Todo) {
        todo.id = todos.length > 0? todos.length + 1: 1;
        console.log(todo);
        setTodos([...todos, todo]);
        axios.post("http://localhost:3000/auth/jwt/tasks", todo, {"headers":{
          'Authorization': 'Bearer ' + token
        }}).then((response) => {
            setTodos([...todos, response.data]);
            navigate("/");
        });
    }

    function editTodo(todo:Todo) {

      axios.put("http://localhost:3000/auth/jwt/tasks", detailTodo(), {"headers":{
        'Authorization': 'Bearer ' + token
      }}).then(() => {
        navigate("/");
      });

    }

    function fillEditForm(todo:Todo) {
      console.log(todo);
      setTodo(todo);
    }

    function deleteTodo(id:number) {
      axios.delete("http://localhost:3000/auth/jwt/task/" + id, {"headers":{
        'Authorization': 'Bearer ' + token
      }}).then(() => {
        navigate("/");
      });

    }

    

    function login(email:string, password:string) {
      axios.post("http://localhost:3000/auth/jwt/sign", {"email":email, "password":password}).then((response) => {
        setToken(response.data.token);
        navigate("/");
      });
    }

    function logout() {
      setToken("");
    }

    function detailTodo() {
      return todos.filter(currentTodo => currentTodo.id == Number.parseInt(searchParams.get("id")??""))[0];
    }
    
    

  return(
      <div className="app">
        
        <Routes>
          <Route path='/' element={token !== ""?<TodoList logout={logout} todos={todos} fillEditTodo={fillEditForm} editTodo={editTodo} deleteTodo={deleteTodo}/>:<Navigate to="/login"/>}></Route>
          <Route path='/create' element={token !== ""?<CreateTodo addTodo={createTodo}/>:<Navigate to="/login"/>}></Route>
          <Route path='/token' element={<p>{token}</p>}></Route>
          <Route path='/edit' element={token !== ""?<EditTodo todo={detailTodo()} editTodo={editTodo}/>:<Navigate to="/login"/>}></Route>
          <Route path='/login' element={token === ""?<LoginForm login={login}/>:<Navigate to="/"/>}></Route>
          <Route path='/todo' element={token !== ""? <DetailTodo todo={detailTodo()}/>:<Navigate to="/login"/>}/>
        </Routes> 
      </div>
  );
      
}

export default App;
