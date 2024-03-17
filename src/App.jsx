import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Components/Todo";

import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  //Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc, id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //update todo in firebase
  const toggleComplete = async (todo) => {
    console.log(todo.id);
    await updateDoc(doc(db, "todos", todo.id), {
      completed:
        !todo._document.data.value.mapValue.fields.completed.booleanValue,
    });
    console.log(todo);
  };
  //Delete todo
  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Add Todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={style.button} onClick={createTodo}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((item) => {
            return (
              <Todo
                key={item.id}
                item={item}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
