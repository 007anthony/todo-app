import React, { useState } from 'react';
import './App.css';
import Todo from './Todo';
import TodoList from './TodoList';
import CreateTodo from './TodoForm';

function App() {

    const [todos, setTodos] = useState(new Array<Todo>());

    function createTodo(todo:Todo) {
        setTodos([...todos, todo]);
        console.log("pushed todo");
    }

    function editTodo(todo:Todo) {

    }

    function deleteTodo(id:number) {
      let newTodos = todos.filter(currentTodo => currentTodo.id != id);
      setTodos(newTodos);

    }

  return(
    <div className="App">
        <TodoList todos={todos} deleteTodo={deleteTodo}></TodoList>
        <CreateTodo addTodo={createTodo}></CreateTodo>
    </div>
  );
}

export default App;
