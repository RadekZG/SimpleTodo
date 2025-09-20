import React, { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";
import { FaEdit } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";



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
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <input className="add" type="submit" value="Add" />
      </form>
      <h2> Incomplete Todos</h2>
      <div className="todo-container">
        <AnimatePresence>
          {todos
            .filter(t => !t.completed)
            .map(todo => (
              <motion.div
                key={todo.id}
                className="todo-card"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", bounce: 0.5 },
                }}
                layout
              >
                <span>{todo.title}</span>
                <button onClick={() => completeTodo(todo.id)}>
                  <FaRegCheckSquare />
                </button>
                <button onClick={() => updateTodo(todo.id, prompt("New title:", todo.title))}>
                  <FaEdit />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <MdDeleteForever />
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <h2>Completed Todos</h2>
      <div className="todo-container">
        <AnimatePresence>
          {todos.filter(t => t.completed).map(todo => (
            <motion.div
              key={todo.id}
              className="todo-card"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.6,
                scale: { type: "spring", bounce: 0.5 },
              }}
              layout
            >
              <span className="completed">{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)} className="delete">
                <MdDeleteForever />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;