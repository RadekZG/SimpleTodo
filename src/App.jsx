import React, { useState, useEffect, useCallback } from "react";
import supabase from "./helper/supabaseClient";
import { FaEdit } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";


function App({user}) {
  const userId = user.id;
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = useCallback(async () => {
    const {data, error} = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {ascending:true});
    
    if (error) console.error(error);
    else setTodos(data);
  }, [userId]);


  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function completeTodo(id) {
    await supabase
    .from("todos")
    .update({completed: true})
    .eq("id", id)
    .eq("user_id", userId)

    fetchTodos();
  }
  
  async function deleteTodo(id) {
    await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)

    fetchTodos();
  }

  async function updateTodo(id, newTitle) {
    await supabase
    .from("todos")
    .update({title: newTitle})
    .eq("id", id)
    .eq("user_id", userId)

    fetchTodos();
  }

  async function addTodo(params) {
    if(!title.trim()) return;

    const {error} = await supabase
    .from("todos")
    .insert([{title, user_id: userId }]);

    if (error) console.error(error);
      else {
    setTitle("")};
    fetchTodos();
  }

  async function Logout(params) {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("Error logging out:", error)
    else console.log("Logged out succesfully")
  }

  return (
    <div>
      <button className="logout" onClick={Logout}>Logout</button>
      <h1>Todo List</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="add" type="submit" value="Add">Add</button>
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
                  duration: 0.1,
                  scale: { type: "spring", bounce: 0.3 },
                }}
                layout
              >
                
                <span>{todo.title}</span>
                
                <button className="check" aria-label="Mark task as complete" onClick={() => completeTodo(todo.id)}>
                  <FaRegCheckSquare width={20} height={20} />
                </button>
                <button className="edit" aria-label="Edit task" onClick={() => updateTodo(todo.id, prompt("New title:", todo.title))}>
                  <FaEdit width={20} height={20}  />
                </button>
                <button className="delete" aria-label="Delete task" onClick={() => deleteTodo(todo.id)}>
                  <MdDeleteForever width={20} height={20}  />
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
                duration: 0.1,
                scale: { type: "spring", bounce: 0.3 },
              }}
              layout
            >
              <span className="completed">{todo.title}</span>
              <button  aria-label="Delete task"  onClick={() => deleteTodo(todo.id)} className="delete">
                <MdDeleteForever width={20} height={20}  />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

