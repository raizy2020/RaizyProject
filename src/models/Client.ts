
import mongoose, { Schema, Document } from "mongoose";
export interface IClient extends Document {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  companyId?: string; 
  type?: "business" | "private";
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  companyId: { type: String },
  type: { type: String, enum: ["business", "private"] },
});

export const Client = mongoose.model<IClient>("Client", ClientSchema);