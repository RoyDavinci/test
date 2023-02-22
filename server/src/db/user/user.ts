import mongoose, {Types, Document} from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name?: string;
  email: string;
  avatar?: string;
  phone: string;
  password: string;
  interest: string[];
  isVerified: boolean;
  otp: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {type: String},
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    interest: {type: [String], required: true, default: ['Music']},
    isVerified: {type: Boolean, default: false},
    otp: {type: Number},
  },
  {timestamps: true},
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
