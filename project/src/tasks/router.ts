import { Router } from 'express';
import { DbTask } from './db/models';
import { StatusCodes } from 'http-status-codes';

export const createTasksRoutes = () => {
	const taskRoutes = Router();
	taskRoutes.post('/', (req, res, next) => {
		try {
			const newTask = new DbTask(req.body);
			newTask.save();
			res.sendStatus(StatusCodes.CREATED);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	taskRoutes.put('/:id', async (req, res, next) => {
		try {
			const updatedTask = await DbTask.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
			if (updatedTask.matchedCount === 0) {
				res.sendStatus(StatusCodes.NOT_FOUND);
			} else {
				res.sendStatus(StatusCodes.OK);
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	});

	taskRoutes.get('/:id', async (req, res, next) => {
		try {
			let task = await DbTask.findById(req.params.id);
			// task?.populate('tasks');
			res.json(task);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	taskRoutes.get('/', async (req, res, next) => {
		try {
			let tasks = await DbTask.find().limit(20);
			res.json(tasks);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	taskRoutes.delete('/:id', async (req, res, next) => {
		try {
			await DbTask.deleteOne({ _id: req.params.id });
			res.sendStatus(StatusCodes.OK);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	return taskRoutes;
};
