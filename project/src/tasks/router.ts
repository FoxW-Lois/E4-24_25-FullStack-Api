import { Router } from 'express';
import { DbTask } from './db/models';
import { StatusCodes } from 'http-status-codes';

export const createTasksRoutes = () => {
    const TaskRoutes = Router();
    TaskRoutes.post('/sprint', async (req, res, next) => {
        try {
            const newTask = new DbTask(req.body);
            await newTask.save();
            res.sendStatus(StatusCodes.CREATED);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    TaskRoutes.put('/:id', async (req, res, next) => {
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

    TaskRoutes.get('/:id', async (req, res, next) => {
        try {
            const task = await DbTask.findById(req.params.id);
            if (!task) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            } else {
                res.status(StatusCodes.OK).json(task);
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    TaskRoutes.get('/', async (req, res, next) => {
        try {
            const tasks = await DbTask.find().limit(20);
            res.status(StatusCodes.OK).json(tasks);
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

    TaskRoutes.delete('/:id', async (req, res, next) => {
        try {
            const deleteResult = await DbTask.deleteOne({ _id: req.params.id });
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

    return TaskRoutes;
};
