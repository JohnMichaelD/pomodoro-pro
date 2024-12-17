import React, { useState, useEffect } from 'react';
import { FaCheck, FaRegTrashCan, FaPlus } from "react-icons/fa6";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadTasks = () => {
      const savedTasks = localStorage.getItem('pomodoro-tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        // Filter out tasks older than 3 days
        const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
        const recentTasks = parsedTasks.filter((task: Task) => task.createdAt > threeDaysAgo);
        setTasks(recentTasks);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: Date.now()
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center border rounded-lg p-4 hover:shadow-lg gap-4 z-50 max-w-[400px]">
      {tasks.length > 0 && (
        <ul className="w-full space-y-2 max-h-48 overflow-y-auto">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center gap-2 group">
              <button
                onClick={() => toggleTask(task.id)}
                className="rounded-full p-2 hover:text-green-500 hover:bg-green-50 transition-colors"
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <FaCheck className={task.completed ? "text-green-500" : "text-gray-400"} />
              </button>
              <span className={`flex-grow font-nanumPenScript text-2xl ${task.completed ? "line-through text-gray-400" : ""}`}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="rounded-full p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all"
                aria-label="Delete task"
              >
                <FaRegTrashCan />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add task"
          className="flex-grow max-w-60 sm:w-96 p-2 border rounded font-nanumPenScript text-xl"
        />
        <button
          onClick={handleAddTask}
          className="rounded-full p-2 hover:text-green-500 hover:bg-green-50 transition-colors"
          aria-label="Add task"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default TaskList;