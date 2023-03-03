import { Schema, model, SchemaTypes } from "mongoose";
import { User } from "../entities/user";

const userSchema = new Schema<User>({
  email:  {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  friends: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
  ],
  enemy: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    }
  ]
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  }
});

export const UserModel = model('User', userSchema, 'users');
