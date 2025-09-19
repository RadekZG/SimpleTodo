import React, { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";
import { FaEdit } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  },[])

  async function fetchTodos(params) {
    const {data, error} = await supabase
    .from("todos")
    .select("*")
    .order("created_at", {ascending:true});
    
    if (error) console.error(error);
    else setTodos(data);
  }

  async function completeTodo(id) {
    await supabase.from("todos").update({completed: true}).eq("id", id);
    fetchTodos();
  }
  
  async function deleteTodo(id) {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  }

  async function updateTodo(id, newTitle) {
    await supabase.from("todos").update({title: newTitle}).eq("id", id);
    fetchTodos();
  }

  async function addTodo(params) {
    if(!title.trim()) return;
    const {error} = await supabase.from("todos").insert([{title}]);
    if (error) console.errror(error);
      else {
    setTitle("")};
    fetchTodos();
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault(); // prevent page refresh
          addTodo();
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <input className="add" type="submit" value="Add" />
      </form>
      <h2> Incomplete Todos</h2>
      <div className="todo-container">
        {
          todos.filter(t => !t.completed).map(todo => (
            <div key={todo.id} className="todo-card">
              <span>{todo.title}</span>
              <button onClick={() => completeTodo(todo.id)}><FaRegCheckSquare /></button>
              <button onClick={() => updateTodo(todo.id, prompt("New tittle:", todo.title))}><FaEdit/></button>
              <button onClick={() => deleteTodo(todo.id)}><MdDeleteForever /></button>
            </div>
          ))
        }
      </div>
      <h2>Complete Todos</h2>
      <div className="todo-container">
        {
          todos.filter(t => t.completed).map(todo => (
            <div key={todo.id} className="todo-card">
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;