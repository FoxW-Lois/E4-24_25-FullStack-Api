import { model, Schema } from "mongoose";

const dbUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const DbUser = model("User", dbUserSchema);

export { DbUser, dbUserSchema };
