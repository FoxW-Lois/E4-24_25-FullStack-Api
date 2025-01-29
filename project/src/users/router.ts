import { Router } from 'express';
import { DbUser } from '../auth/db/models';

export const createUserRoutes = () => {
	const userRoutes = Router();
	userRoutes.get('/:id', async (req, res, next) => {
		try {
			let user = await DbUser.findById(req.params.id);
			// user?.populate('user');
			res.json(user);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	userRoutes.get('/', async (req, res, next) => {
		try {
			const users = (await DbUser.find().limit(20).populate('roles'))!;
			res.json(
				users.map((u) => ({
					_id: u._id,
					name: u.name,
					email: u.email,
					roles: u.roles
				}))
			);
		} catch (error) {
			console.log(error);
			next(error);
		}
	});

	return userRoutes;
};
