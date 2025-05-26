import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';

const Dashboard = () => {
  const {
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  } = useTaskContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(undefined);

  const openAddModal = () => {
    setCurrentTask(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (taskData) => {
    if ('id' in taskData) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar openTaskModal={openAddModal} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              My Tasks
            </h1>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </button>
          </div>
        </div>

        <div className="mt-6 pb-5">
          <FilterTabs />
        </div>

        <div className="mt-6">
          <SearchBar />
        </div>

        <div className="mt-8">
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openEditModal}
                  onDelete={deleteTask}
                  onToggleStatus={toggleTaskStatus}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredTasks.length === 0
                  ? 'Get started by creating a new task'
                  : 'Try changing your search query or filter'}
              </p>
              <div className="mt-6">
                <button
                  onClick={openAddModal}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  New Task
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating action button on mobile */}
      <div className="sm:hidden fixed right-6 bottom-6">
        <button
          onClick={openAddModal}
          className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialTask={currentTask}
      />
    </div>
  );
};

export default Dashboard;
