import mongoose, { model, Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import httpErrors from 'mongoose-errors';

interface IProject extends Document {
	name: string;
	description?: string;
	leader?: mongoose.Types.ObjectId;
	scrumMaster?: mongoose.Types.ObjectId;
	productOwner?: mongoose.Types.ObjectId;
	participants: mongoose.Types.ObjectId[];
	tasks: mongoose.Types.ObjectId[];
	sprints: { id: number; startDate: Date; endDate: Date }[];
	stories: mongoose.Types.ObjectId[];
}

const dbProjectSchema = new Schema<IProject>({
	name: { type: String, unique: true },
	description: { type: String },
	leader: { type: mongoose.Types.ObjectId, ref: 'User' },
	scrumMaster: { type: mongoose.Types.ObjectId, ref: 'User' },
	productOwner: { type: mongoose.Types.ObjectId, ref: 'User' },
	participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
	sprints: [{ id: Number, startDate: Date, endDate: Date }],
	stories: [{ type: mongoose.Types.ObjectId, ref: 'Story' }]
});

dbProjectSchema.plugin(uniqueValidator);
dbProjectSchema.plugin(httpErrors);

const DbProject = model<IProject>('Project', dbProjectSchema);

export { DbProject, dbProjectSchema };
