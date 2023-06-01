import './App.css';
import TaskCreate from './Components/TaskCreate';
import TaskList from './Components/TaskList';
import { useState,useEffect } from 'react';
import axios from 'axios';



//https://www.npmjs.com/package/json-server/v/0.16.1
//first open a API folder and create a .json file
//then open a new terminal and write npm install -g json-server   to the terminal
//then write json-server --watch task/API/db.json --port  3004  to the terminal
// you also need to install axios with npm install axios
function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, taskDesc) => {

    const post =await axios.post('http://localhost:3004/tasks', { title: title, taskDesc: taskDesc });
    
    const createdTasks = [
      ...tasks,post.data
    ];
    setTasks(createdTasks);
  };

  const fetchTasks = async() => {
    const response = await axios.get('http://localhost:3004/tasks');
    setTasks(response.data);
}

  useEffect(() => { 
    fetchTasks();
  }, []);
  

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3004/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };
  const editTaskById =async (id, updatedTitle, updatedTaskDesc) => {

    await axios.put(`http://localhost:3004/tasks/${id}`, {
      
      title: updatedTitle,
      taskDesc: updatedTaskDesc
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>TASKS</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
