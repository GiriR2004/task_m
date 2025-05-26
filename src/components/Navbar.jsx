import React from 'react';
import { ListTodo, Plus } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const Navbar = ({ openTaskModal }) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ListTodo className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800">TaskFlow</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={openTaskModal}
              className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Task
            </button>
            <div className="ml-4 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
