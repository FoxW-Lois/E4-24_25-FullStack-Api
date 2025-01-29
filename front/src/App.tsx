import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './components/ProjectDetails';
import TaskDetails from './components/TaskDetails';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import UserDetails from './components/UserDetails';
import { Container, AppBar, Button, Toolbar } from '@mui/material';
import Logo from './logo-fav.png';
import Home from './components/Home';
import Endev from './components/Endev';

function App(): React.JSX.Element {
	return (
		<>
			<BrowserRouter>
				<AppBar position="fixed" color="primary">
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<img
							src={Logo}
							alt="GestProj Logo"
							style={{ maxWidth: '50px', height: 'auto', marginRight: '10px' }}
						/>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/projects">
							Projects
						</Button>
						<Button color="inherit" component={Link} to="/tasks">
							Tasks
						</Button>
						<Button color="inherit" component={Link} to="/users">
							Users
						</Button>
						<Button color="inherit" component={Link} to="/endev">
							Sprints
						</Button>
						<Button color="inherit" component={Link} to="/endev">
							Stories
						</Button>
					</Toolbar>
				</AppBar>

				<Container maxWidth="md">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/projects/:id" element={<ProjectDetails />} />
						<Route path="/tasks" element={<TasksPage />} />
						<Route path="/tasks/:id" element={<TaskDetails />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/users/:id" element={<UserDetails />} />
						<Route path="/endev" element={<Endev />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
