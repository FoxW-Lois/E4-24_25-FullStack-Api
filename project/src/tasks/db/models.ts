import mongoose, { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import httpErrors from 'mongoose-errors';

interface ITask extends Document {
	// id: number;
	title: string;
	description: string;
	status: string;
	// project: mongoose.Types.ObjectId;
}

const dbTaskSchema = new Schema<ITask>({
	// id: { type: Number, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, required: true }
	// project: { type: mongoose.Types.ObjectId, ref: 'Project' }
});

dbTaskSchema.plugin(uniqueValidator);
dbTaskSchema.plugin(httpErrors);

const DbTask = model<ITask>('Task', dbTaskSchema);

export { DbTask, dbTaskSchema };
