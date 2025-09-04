import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  referenceNumber: string;
  date: Date;
  supplier: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  amount: number;
  vat: number;
  paymentType: 'cash' | 'credit' | 'check' | 'bank_transfer';
  referenceFile?: string;
  details?: string;
}

const ExpenseSchema: Schema = new Schema({
  referenceNumber: { type: String, required: true },
  date: { type: Date, required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: { type: Number, required: true },
  vat: { type: Number, required: true },
  paymentType: { type: String, enum: ['cash', 'credit', 'check', 'bank_transfer'], required: true },
  referenceFile: { type: String },
  details: { type: String }
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
