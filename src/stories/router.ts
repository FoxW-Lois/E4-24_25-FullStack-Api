import { NextFunction, Request, Router } from "express";
import { DbProject, DbStory } from "./db/models";
import { StatusCodes } from "http-status-codes";

export const createProjectRoutes = () => {
    const projectRoutes = Router();
    projectRoutes.post('/story', (req, res, next) => {
        try {
            const newStory = new DbStory(req.body);
            newStory.save();
            res.sendStatus(StatusCodes.CREATED);
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

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

    return projectRoutes;
}