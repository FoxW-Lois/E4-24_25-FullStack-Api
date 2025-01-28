import cookieParser from 'cookie-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { checkAccessToken } from './auth/midlewares';
import { createAuthRoutes } from './auth/router';
import { HttpError } from 'http-errors';
import { createProjectRoutes } from './projects/router';
import errorHandler from 'errorhandler';
import { createUserRoutes } from './users/router';
import { createStoriesRoutes } from './stories/router';
import { createTasksRoutes } from './tasks/router';
import { createSprintRoutes } from './sprints/router';
import helmet from 'helmet';
import lusca from 'lusca';
import cors from 'cors';

export const createApp = () => {
	const app = express();
	app.use(cors('http://localhost:3000/' as any));
	app.use(helmet());
	app.use(lusca());

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(cookieParser(process.env.COOKIE_SECRET!));

	// app.use(createAuthRoutes());
	app.use(express.static('./src/public'));
	app.use('/api', createAuthRoutes());
	app.use('/api/projects', /*checkAccessToken,*/ createProjectRoutes());
	app.use('/api/users', /*checkAccessToken,*/ createUserRoutes());
	app.use('/api/stories', /*checkAccessToken,*/ createStoriesRoutes());
	app.use('/api/tasks', /*checkAccessToken,*/ createTasksRoutes());
	app.use('/api/sprints', /*checkAccessToken,*/ createSprintRoutes());
	// app.get('/', checkAccessToken, (req: express.Request, res: express.Response) => {
	//     res.send('Hello World!');
	// });

	if (process.env.NODE_ENV !== 'production') {
		app.use(errorHandler());
	} else {
		const handleErrors = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			console.log(err);
			if (err instanceof HttpError) {
				res.status(err.status);
				res.send(err.message);
				return;
			}
			res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
		};
		app.use(handleErrors);
	}

	return app;
};
