import { Router } from 'express';
import { DbSprint } from './db/models'; // Assurez-vous que le chemin est correct
import { StatusCodes } from 'http-status-codes';

export const createSprintRoutes = () => {
    const SprintRoutes = Router();
    SprintRoutes.post('/sprints', async (req, res, next) => {
        try {
            const newSprint = new DbSprint(req.body);
            await newSprint.save();
            res.sendStatus(StatusCodes.CREATED);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    SprintRoutes.put('/sprints/:id', async (req, res, next) => {
        try {
            const updatedSprint = await DbSprint.updateOne({ id: req.params.id }, req.body, { runValidators: true });
            if (updatedSprint.matchedCount === 0) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            } else {
                res.sendStatus(StatusCodes.OK);
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    SprintRoutes.get('/sprints/:id', async (req, res, next) => {
        try {
            const sprint = await DbSprint.findOne({ id: req.params.id });
            if (!sprint) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            } else {
                res.status(StatusCodes.OK).json(sprint);
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    SprintRoutes.get('/sprints', async (req, res, next) => {
        try {
            const sprints = await DbSprint.find().limit(20);
            res.status(StatusCodes.OK).json(sprints);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    SprintRoutes.delete('/sprints/:id', async (req, res, next) => {
        try {
            const deleteResult = await DbSprint.deleteOne({ id: req.params.id });
            if (deleteResult.deletedCount === 0) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            } else {
                res.sendStatus(StatusCodes.OK);
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    return SprintRoutes;
};
