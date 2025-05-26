import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;