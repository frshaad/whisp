import { type InferSchemaType, type ObjectId, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: 8 },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    profileImg: { type: String, default: '' },
    coverImg: { type: String, default: '' },
    bio: { type: String, default: '' },
    link: { type: String, default: '' },
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
  },
  { timestamps: true },
);

type UserType = InferSchemaType<typeof userSchema>;
type UserTypeWithId = InferSchemaType<typeof userSchema> & {
  _id: ObjectId;
};
const User = model('User', userSchema);

export { User, type UserType, type UserTypeWithId };
