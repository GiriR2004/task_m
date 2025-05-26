import React, { createContext, useContext, useState } from 'react';

// Sample initial tasks
const initialTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and submit the project proposal for the new client',
    dueDate: '2025-01-15',
    status: 'open',
  },
  {
    id: '2',
    title: 'Review wireframes',
    description: 'Review and provide feedback on the new dashboard wireframes',
    dueDate: '2025-01-10',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Team meeting',
    description: 'Weekly team sync to discuss project progress and blockers',
    dueDate: '2025-01-05',
    status: 'open',
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update the API documentation with the latest changes',
    dueDate: '2025-01-20',
    status: 'open',
  },
];

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'open' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on active filter and search query
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'open' && task.status !== 'open') return false;
    if (activeFilter === 'completed' && task.status !== 'completed') return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.dueDate.includes(query)
      );
    }

    return true;
  });

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'open' ? 'completed' : 'open' }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        activeFilter,
        searchQuery,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        setActiveFilter,
        setSearchQuery,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
