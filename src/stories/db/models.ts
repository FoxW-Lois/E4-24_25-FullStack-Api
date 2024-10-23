import mongoose, { model, Schema, Document } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import httpErrors from "mongoose-errors";

// Interface pour les stories
interface IStory extends Document {
    name: string;
    description?: string;
    tasks: { id: number; name: string; done: boolean }[];
}

// Schéma pour les stories
const dbStorySchema = new Schema<IStory>({
    name: { type: String, unique: true },
    description: String,
    tasks: [{ id: Number, name: String, done: Boolean }]
});
dbStorySchema.plugin(uniqueValidator);
dbStorySchema.plugin(httpErrors);

// Modèle Story
const DbStory = model<IStory>('Story', dbStorySchema);

// Interface pour les projets
interface IProject extends Document {
    name: string;
    description?: string;
    leader?: mongoose.Types.ObjectId;
    scrumMaster?: mongoose.Types.ObjectId;
    productOwner?: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
    sprints: { id: number; startDate: Date; endDate: Date }[];
    stories: {
        story: mongoose.Types.ObjectId;
        assignees: {
            user: mongoose.Types.ObjectId;
            tasks: number[];
        }[];
    }[];
}

// Schéma pour les projets
const dbProjectSchema = new Schema<IProject>({
    name: String,
    description: String,
    leader: { type: mongoose.Types.ObjectId, ref: 'User' },
    scrumMaster: { type: mongoose.Types.ObjectId, ref: 'User' },
    productOwner: { type: mongoose.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    sprints: [{ id: Number, startDate: Date, endDate: Date }],
    stories: [{
        story: { type: mongoose.Types.ObjectId, ref: 'Story' },
        assignees: [{
            user: { type: mongoose.Types.ObjectId, ref: 'User' },
            tasks: [Number]
        }]
    }]
});

dbProjectSchema.plugin(uniqueValidator);
dbProjectSchema.plugin(httpErrors);

// Modèle Project
const DbProject = model<IProject>('Project', dbProjectSchema);

export { DbProject, dbProjectSchema, DbStory, dbStorySchema };
