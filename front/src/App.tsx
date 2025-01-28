import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './components/ProjectDetails';
import TaskDetails from './components/TaskDetails';
import TasksPage from './pages/TasksPage';
import viteLogo from './vite-logo.png';
import reactLogo from './react-logo.png';

function App(): React.JSX.Element {
	return (
		<>
			<div>
                <img src={viteLogo} className="logo" alt="Vite logo" />
				<img src={reactLogo} className="logo react" alt="React logo" />
            </div>
			<div>
				{/* <button onClick={projects}>Projets</button>
				<button onClick={tasks}>Tâches</button> */}
			</div>
			<BrowserRouter>
				<main>
					<Routes>
						{/* <Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} /> */}

						<Route path='/projects' element={<ProjectsPage />} />
						<Route path='/projects/:id' element={<ProjectDetails />} />
						<Route path='/tasks' element={<TasksPage />} />
						<Route path='/tasks/:id' element={<TaskDetails />} />

						{/* <Route path='/projects/add' element={<AddProject />} /> 
						<Route path='*' elemen:t={<NotFound />} />*/}
					</Routes>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
