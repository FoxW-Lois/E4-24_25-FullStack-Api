// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProjectsPage from './pages/ProjectsPage';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/projects" element={<ProjectsPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage'; // Page des projets
import UsersPage from './pages/UsersPage'; // Page des utilisateurs
import TasksPage from './pages/TasksPage'; // Page des tâches

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/tasks/*" element={<TasksPage />} />
      </Routes>
    </Router>
  );
};

export default App;
