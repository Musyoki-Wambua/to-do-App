import { useState } from 'react';
import './App.css';
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false)

  return (
    <div className="App">
     <h1>Todos</h1>
     <div className="todo-wrapper">
        <div className="todo-input">
          <div className='todo-input-item'> 
            <label htmlFor="title">Title: </label>
            <input type="text" placeholder="What's the Task Title?" />
          </div>

          <div className='todo-input-item'> 
            <label htmlFor="title">Description: </label>
            <input type="text" placeholder="What's the Task Description?" />
          </div>
          
          <div className='todo-input-item'> 
            <button className='primaryBtn' type='button'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)} >Todo</button>
          <button  className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)} >Completed</button>
        </div>

        <div className='todo-list'>
          <div className='todo-list-item'>
            <div>
              <h3>Task 1</h3>
              <p>This is a description for task one.</p>
            </div>

            <div>
              < MdDeleteForever className='icon'/>
              <IoCheckmark className='check-icon'/>
            </div>
          </div>
        </div>

     </div>
    </div>
  );
}

export default App;