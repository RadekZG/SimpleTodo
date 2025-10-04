import React, { useState, useEffect, useCallback } from "react";
import supabase from "./helper/supabaseClient";
import { RiEditLine } from "react-icons/ri";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import LegalModal from "./components/LegalModal";


function App({user}) {
  const userId = user.id;
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(null);

  const fetchTodos = useCallback(async () => {
    const {data, error} = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {ascending:false});
    
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
      <h1>Simple Todo</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (editingId){
            updateTodo(editingId, title);
            setEditingId(null);
            setTitle("");
          } else{
            addTodo();
          }

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
      <div className="texts">
        
       
      </div>
      <div className="containers">
        <div className="todo-container">
        <h2> Incomplete Todos</h2>
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
                    <FaRegCheckSquare />
                  </button>
                  <button 
                    className="edit"
                    aria-label="Edit task"
                    onClick={() => {
                    setTitle(todo.title);
                    setEditingId(todo.id);
                  }}>
                    <RiEditLine />
                  </button>
                  <button className="delete" aria-label="Delete task" onClick={() => deleteTodo(todo.id)}>
                    <MdDeleteForever />
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <div className="todo-container">
          <h2>Completed Todos</h2>
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
      <footer style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem" }}>
        © 2025 MyToDoApp |{" "}
        <button onClick={() => setShowModal("terms")} style={linkStyle}>Terms</button> |{" "}
        <button onClick={() => setShowModal("privacy")} style={linkStyle}>Privacy</button>
      </footer>

      {showModal && <LegalModal type={showModal} onClose={() => setShowModal(null)} />}
    </div>
  );
}

const linkStyle = {
  background: "none",
  border: "none",
  color: "#007bff",
  cursor: "pointer",
  textDecoration: "underline",
};

export default App;

