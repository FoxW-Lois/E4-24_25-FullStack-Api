import { model, Schema } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import httpErrors from "mongoose-errors";

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

const DbUser = model('User', dbUserSchema);

export { DbUser, dbUserSchema };