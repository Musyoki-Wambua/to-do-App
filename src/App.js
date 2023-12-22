import { useEffect, useState } from "react";
import "./App.css";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

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

  // const handleDeleteTodo = (index) => {
  //   let reducedTodo = [...allTodos];
  //   reducedTodo.splice(index);

  //   localStorage.setItem('todolist', JSON.stringify(reducedTodo))
  //   setAllTodos(reducedTodo)
  // }

  const handleDeleteTodo = (index) => {
    const reducedTodo = allTodos.filter((element, i) => i !== index);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = addZero(now.getMinutes());
    let s = addZero(now.getSeconds());

    function addZero(i) {
      if (i < 10) {i = "0" + i}
      return i;
    }
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItems = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItems);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);

    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
  }

  // const handleDeleteCompletedTodo =(index) => {
  //   let reducedTodo = [...completedTodos];
  //   reducedTodo.splice(index);

  //   localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
  //   setCompletedTodos(reducedTodo)
  // }

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = completedTodos.filter((element, i) => i !== index);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if (savedTodo) {
      setAllTodos(savedTodo)
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo)
    }
  }, [])
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
          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <MdDeleteForever className="icon" onClick={() => handleDeleteTodo(index)} />
                  <IoCheckmark className="check-icon" onClick={() => handleComplete(index)} />
                </div>
              </div>
            );
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small style={{color: 'white'}}>Completed on: {item.completedOn} </small></p>
                </div>

                <div>
                  <MdDeleteForever className="icon" onClick={() => handleDeleteCompletedTodo(index)} />
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
