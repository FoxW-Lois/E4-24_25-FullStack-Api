import mongoose, { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import httpErrors from 'mongoose-errors';

interface ITask extends Document {
	id: number;
	name: string;
	done: boolean;
}

const dbTaskSchema = new Schema<ITask>({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	done: { type: Boolean, required: true }
});

dbTaskSchema.plugin(uniqueValidator);
dbTaskSchema.plugin(httpErrors);

const DbTask = model<ITask>('Task', dbTaskSchema);

export { DbTask, dbTaskSchema };
