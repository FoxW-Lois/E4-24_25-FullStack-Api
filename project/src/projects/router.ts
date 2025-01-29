import { Router } from 'express';
import { DbProject } from './db/models';
import { StatusCodes } from 'http-status-codes';

export const createProjectRoutes = () => {
	const projectRoutes = Router();
	projectRoutes.post('/', (req, res, next) => {
		try {
			const newProject = new DbProject(req.body);
			newProject.save();
			res.sendStatus(StatusCodes.CREATED);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	projectRoutes.put('/:id', async (req, res, next) => {
		try {
			console.log('body', req.body);

			let project = await DbProject.updateOne({ _id: req.params.id }, req.body);
			res.sendStatus(StatusCodes.CREATED);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	projectRoutes.get('/:id', async (req, res, next) => {
		try {
			let project = await DbProject.findById(req.params.id);
			project?.populate('leader');
			res.json(project);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	projectRoutes.get('/', async (req, res, next) => {
		try {
			let projects = await DbProject.find().limit(20).populate('leader', '_id name email');
			res.json(projects);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	projectRoutes.delete('/:id', async (req, res, next) => {
		try {
			await DbProject.deleteOne({ _id: req.params.id })
			res.sendStatus(StatusCodes.OK);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	return projectRoutes;
};
