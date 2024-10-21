
import { useState } from 'react';

import './index.css';
import { FaPowerOff } from "react-icons/fa6";
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { HiQuestionMarkCircle } from "react-icons/hi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Tooltip from './components/tooltip';
function App() {


  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');

  console.log(task);

  // Get date

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const months = ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date();

  let day = days[date.getDay()];
  day = day.toUpperCase();
  const PrsentDate = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  console.log("day =", day);

  console.log("month =", month);


  //add task
  const handleSubmit = (e) => {
    e.preventDefault();


    if (inputValue !== '') {


      const addTask = {
        id: Math.floor(Math.random() * 1000),
        text: inputValue,
        completed: false,
      }
      setTask([...task, addTask]);
      setInputValue('');

    }
    else {
      alert("null value cant be added as a task");
    }


    console.log(task);

  }



  //delete task

  const deleteTask = (id) => {
    const deletedTask = task.find((task) => task.id === id);

    // Log the task that was deleted
    console.log('Task deleted:', deletedTask);


    //dispalying deleted task in console


    let filteredTask = [...task].filter((task) => task.id !== id)
    setTask(filteredTask);
    console.log('task deleted', task);
  }

  // underline completed tasks

  const completedTask = (id) => {
    setTask(
      task.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    )

  }
  //trying .find menthod for array
  const numbers = [12, 43, 98.01, 221, 1234];
  const result = numbers.find(number => number > 12);
  console.log("rsult of practicing .find method", result);

  return (

    <div className="App">




      <div className="container">

        <h1 className='title' > <FaPowerOff /> PowerList</h1>

        <div>






          {/* <Tooltip text="->press enter to add task      
            ->double click on task to set it as complete or incomplete 
          ->press X to remove task"> */}

          <Tooltip
            text={
              <span
                dangerouslySetInnerHTML={{
                  __html: `
          -> press enter to add task.<br />
          -> double click on task to set it as complete or incomplete.<br />
          -> press X to remove task.
        `
                }}
              />
            }
          >
            <HiQuestionMarkCircle className='q-btn'></HiQuestionMarkCircle>

          </Tooltip>
        </div>

        <div className="date">
          <p>{day}</p>
          <p>{PrsentDate}</p>
          <p>{month}</p>
          <p>{year}</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-input">
            <AiOutlinePlus className='icon' onClick={handleSubmit} />


            <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Enter task' type='text' className='task-input' />
          </div>

          {/* <button  >Add</button> */}

        </form>

        <div>
          {task.map(task => (
            <div className={`task-row ${task.completed ? 'completed' : ''}`} key={task.id} ontriple onDoubleClick={() => completedTask(task.id)}  >

              <p>{task.text}  </p>
              <AiOutlineClose className='task-row-icon' onClick={() => deleteTask(task.id)}>  </AiOutlineClose>
            </div>

          ))}
        </div>

        <p>{(task < 1) ? "you have no tasks at the moment" : `No of Tasks: ${task.length}`}</p>


      </div>
    </div>

  );
}

export default App;
