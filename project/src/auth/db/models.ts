import { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import httpErrors from 'mongoose-errors';
import { Blacklist, UserData, UserDetails, Permission } from '../models';

// Interface pour le modèle Role
interface IRole extends Document {
    name: string;
    permissions: Array<Permission>;
}

// Schéma pour Role
const dbRoleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    permissions: [
        {
            actions: [
                {
                    type: String,
                    required: true
                }
            ],
            resources: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ]
});
dbRoleSchema.plugin(uniqueValidator);
dbRoleSchema.plugin(httpErrors);

// Modèle Role
const DbRole = model<IRole>('Role', dbRoleSchema);

export { DbRole, dbRoleSchema };

// Interface pour le modèle User
interface IUser extends Document, UserData, UserDetails, Blacklist {}

// Schéma pour User
const dbUserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
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
    accessTokens: { type: [String], default: [] },
    refreshTokens: { type: [String], default: [] },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});
dbUserSchema.plugin(uniqueValidator);
dbUserSchema.plugin(httpErrors);

// Modèle User
const DbUser = model<IUser>('User', dbUserSchema);

export { DbUser, dbUserSchema };
