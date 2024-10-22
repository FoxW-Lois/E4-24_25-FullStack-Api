import mongoose from "mongoose";
import { createApp } from "./createApp";
import { schedule } from "node-cron";
import { DbUser } from "./auth/db/models";
import { JwtPayload, verify } from "jsonwebtoken";

const app = createApp();

mongoose.connect(process.env.MONGO_URI!).then(async () => {
    console.log("Connected to MongoDB!");
    app.listen(process.env.PORT, () => {
        console.log("Server started on port", process.env.PORT);
    });
});

const every3min = "0 */1 * * * *";
schedule(every3min, async () => {
    const usersWithTokens = await DbUser.find({expiredTokens : { $exists: true, $not: {$size: 0} } }).limit(100);
    for(const user of usersWithTokens) {
        for(const dbToken of user.expiredTokens) {
            try {
                const token = verify(dbToken, process.env.JWT_ACCESS_TOKEN_SECRET!) as JwtPayload;
            } catch (error) {
                await DbUser.updateOne({email:user.email}, {$pull : {expiredTokens : dbToken}});
            }
        }
    };
});
