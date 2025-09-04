import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  email?: string;
  phone?: string;
}

const SupplierSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String }
});

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);
