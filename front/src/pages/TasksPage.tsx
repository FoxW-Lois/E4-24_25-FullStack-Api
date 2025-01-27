import React from 'react';
import TaskList from '../components/TaskList';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';
import { Route, Routes } from 'react-router-dom';

const TasksPage: React.FC = () => {
	return (
		<div>
			<h1>Tasks</h1>
			<Routes>
				<Route path="/" element={<TaskList />} />
				<Route path="/create" element={<TaskForm />} />
				<Route path="/edit/:id" element={<TaskForm />} />
				<Route path="/:id" element={<TaskDetails />} />
			</Routes>
		</div>
	);
};

export default TasksPage;
