import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskFilter } from '../types';

interface TaskContextProps {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: TaskFilter;
  searchQuery: string;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  setActiveFilter: (filter: TaskFilter) => void;
  setSearchQuery: (query: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Sample initial tasks
const initialTasks: Task[] = [
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

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter tasks based on active filter and search query
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (activeFilter === 'open' && task.status !== 'open') return false;
    if (activeFilter === 'completed' && task.status !== 'completed') return false;
    
    // Filter by search query
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
  
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'open' ? 'completed' : 'open' }
          : task
      )
    );
  };

  const value = {
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
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};