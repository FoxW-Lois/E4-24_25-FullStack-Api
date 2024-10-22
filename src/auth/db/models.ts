import { model, Schema } from "mongoose";

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
    expiredTokens : {type : [String], default : []}
})

const DbUser = model("User", dbUserSchema);

export { DbUser, dbUserSchema };