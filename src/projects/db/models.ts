import mongoose, { model, Schema, Document } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import httpErrors from "mongoose-errors";

// Interface pour typer les projets
interface IProject extends Document {
    name: string;
    description?: string;
    leader?: mongoose.Types.ObjectId;
    scrumMaster?: mongoose.Types.ObjectId;
    productOwner?: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
    sprints: { id: number; startDate: Date; endDate: Date }[];
    stories: mongoose.Types.ObjectId[];
}

// Schéma du projet
const dbProjectSchema = new Schema<IProject>({
    name: { type: String, unique: true },
    description: String,
    leader: { type: mongoose.Types.ObjectId, ref: 'User' },
    scrumMaster: { type: mongoose.Types.ObjectId, ref: 'User' },
    productOwner: { type: mongoose.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    sprints: [{ id: Number, startDate: Date, endDate: Date }],
    stories: [{ type: mongoose.Types.ObjectId, ref: 'Story' }]
});

// Ajout des plugins Mongoose
dbProjectSchema.plugin(uniqueValidator);
dbProjectSchema.plugin(httpErrors);

// Modèle Project
const DbProject = model<IProject>('Project', dbProjectSchema);

export { DbProject, dbProjectSchema };
