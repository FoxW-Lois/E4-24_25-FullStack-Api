import mongoose from 'mongoose';
import { createApp } from './createApp';
import { schedule } from 'node-cron';
import { cleanExpiredAccessTokensFromDB } from './auth/util';

const app = createApp();

mongoose.connect(process.env.MONGO_URI!).then(async () => {
    console.log('Connected to MongoDB!');
    app.listen(process.env.PORT, () => {
        console.log('Server started on port', process.env.PORT);
    });
})

const everySomething = process.env.SCHEDULE_CLEANING_FREQUENCY || '* * * * *';
schedule(everySomething, cleanExpiredAccessTokensFromDB);
