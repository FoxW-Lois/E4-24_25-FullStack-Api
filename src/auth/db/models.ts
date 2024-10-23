import { Document, model, Schema } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import httpErrors from "mongoose-errors";

interface IDbUser extends Document {
    email: string;
    password: string;
    expiredAccessTokens: string[];
    expiredRefreshTokens: string[];
}

const dbUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    expiredAccessTokens: { type: [String], default: [] },
    expiredRefreshTokens: { type: [String], default: [] }
});
dbUserSchema.plugin(uniqueValidator);
dbUserSchema.plugin(httpErrors);

const DbUser = model<IDbUser>('User', dbUserSchema);

export { DbUser, dbUserSchema };