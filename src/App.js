import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority is Medium
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskContent, setEditedTaskContent] = useState('');

  // Load tasks from localStorage when app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && Array.isArray(savedTasks)) {
      setTasks(savedTasks);
    }
    setLoading(false); // Set loading to false after data is loaded
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (!task.trim()) return;
    const newTask = { id: uuidv4(), content: task, completed: false, priority };
    setTasks([...tasks, newTask]);
    setTask('');
    setPriority('Medium'); // Reset priority to Medium after adding task
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Advanced To-Do List</h1>

      {/* Task input area */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new task"
          style={{ padding: 10, width: '60%' }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: 10, marginLeft: 10 }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask} style={{ padding: 10, marginLeft: 10 }}>Add</button>
      </div>

      {/* Task List */}
      <div style={{ width: '60%', margin: '0 auto' }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: task.completed ? '#e0ffe0' : 'white',
                padding: 15,
                marginBottom: 10,
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  style={{ marginRight: 10 }}
                />
                {task.content}
              </div>
              <div style={{ marginLeft: 10, fontStyle: 'italic', color: 'gray' }}>
                Priority: {task.priority}
              </div>
              <button onClick={() => handleDeleteTask(task.id)} style={{ padding: 5 }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'gray' }}>No tasks yet. Add one!</p>
        )}
      </div>
      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px 0', marginTop: '20px', borderTop: '1px solid #ccc' }}>
        <p>Developed by <strong>Govind Chaudhary</strong></p>
        <p>Email: <a href="mailto:gs9012406068@gmail.com">gs9012406068@gmail.com</a></p>
        <p>
          
          <a href="https://www.linkedin.com/in/govind-chaudhary-057770189/" target="_blank" rel="noopener noreferrer">
          LinkedIn
          </a>
          <p><i>Login system and authentication will be developed soon!</i></p>
        </p>
      </footer>
    </div>
  );
};

export default App;
