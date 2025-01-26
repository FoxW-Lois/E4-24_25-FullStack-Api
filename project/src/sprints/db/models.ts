import mongoose, { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import httpErrors from 'mongoose-errors';

// Définition de l'interface Sprint
interface ISprint extends Document {
    id: number;
    startDate: Date;
    endDate: Date;
}

// Création du schéma pour Sprint
const dbSprintSchema = new Schema<ISprint>({
    id: { type: Number, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

dbSprintSchema.plugin(uniqueValidator);
dbSprintSchema.plugin(httpErrors);

const DbSprint = model<ISprint>('Sprint', dbSprintSchema);

export { DbSprint, dbSprintSchema };
