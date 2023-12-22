import { useEffect, useState } from "react";
import "./App.css";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoitem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoitem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    if(savedTodo){
      setAllTodos(savedTodo)
    }
  })
  return (
    <div className="App">
      <h1>Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the Task Title?"
            />
          </div>

          <div className="todo-input-item">
            <label htmlFor="title">Description: </label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the Task Description?"
            />
          </div>

          <div className="todo-input-item">
            <button
              className="primaryBtn"
              type="button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <MdDeleteForever className="icon" />
                  <IoCheckmark className="check-icon" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
