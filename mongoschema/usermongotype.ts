import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    userName: string;
    userPassword: string;
    userEmail: string;
    userRole:string;
}


// Mongoose Schema definition
const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPassword: { type: String, required: true },
  userRole: { type: String, default:"user" }

});

// Export the model and attach it to the interface
const UserInfo = mongoose.model<IUser>('user-collations', UserSchema);
export default UserInfo;
