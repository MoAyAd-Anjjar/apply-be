import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for the data model
export interface IInitializeState extends Document {
  userName: string;
  userEmail: string;
  userID?: string;
  userPhone: number | null;
  skills: string;
  applied: string;
  status?:string,
  
}

// Mongoose Schema definition
const ApplySchema: Schema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: Number, default: null },
  skills: { type: String, required: true },
  applied: { type: String, required: true,default:"notyet" },
  userID: { type: String, required: true },
  status: { type: String, required: true ,default:"no"}

});

// Export the model and attach it to the interface
const ApplyInfo = mongoose.model<IInitializeState>('apply_colls', ApplySchema);
export default ApplyInfo;
