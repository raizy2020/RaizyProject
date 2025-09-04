import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email?: string;
  phone?: string;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String }
});

export default mongoose.model<IClient>('Client', ClientSchema);
