import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './components/ProjectDetails';
import TaskDetails from './components/TaskDetails';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import UserDetails from './components/UserDetails';
import { Container, Box } from '@mui/material';
import Logo from './logo-fav.png';

function App(): React.JSX.Element {
	return (
		<>
			<BrowserRouter>
				<Container maxWidth="md">
					<Box textAlign="center" my={4}>
						<Box textAlign="center" my={4}>
							<img src={Logo} alt="GestProj Logo" style={{ maxWidth: '200px', height: 'auto' }} />
						</Box>
					</Box>
					<Routes>
						{/* <Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} /> */}

						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/projects/:id" element={<ProjectDetails />} />
						<Route path="/tasks" element={<TasksPage />} />
						<Route path="/tasks/:id" element={<TaskDetails />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/users/:id" element={<UserDetails />} />

						{/* <Route path='/projects/add' element={<AddProject />} /> 
						<Route path='*' elemen:t={<NotFound />} />*/}
					</Routes>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
