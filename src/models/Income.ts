import mongoose, { Schema, Document } from 'mongoose';

export interface IIncome extends Document {
  receiptNumber: string;
  date: Date;
  client: mongoose.Types.ObjectId;
  amount: number;
  vat: number;
  paymentType: 'cash' | 'credit' | 'check' | 'bank_transfer';
  details?: string;
  printDate?: Date;
  cashAmount?: number;
  creditLast4?: string;
  creditAmount?: number;
  creditPayments?: number;
  checkNumber?: string;
  checkAccount?: string;
  checkBank?: string;
  checkAmount?: number;
  checkDueDate?: Date;
  bankTransferNumber?: string;
  bankTransferAccount?: string;
  bankTransferBank?: string;
  bankTransferAmount?: number;
  bankTransferDueDate?: Date;
}

const IncomeSchema: Schema = new Schema({
  receiptNumber: { type: String, required: true },
  date: { type: Date, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  amount: { type: Number, required: true },
  vat: { type: Number, required: true },
  paymentType: { type: String, enum: ['cash', 'credit', 'check', 'bank_transfer'], required: true },
  details: { type: String },
  printDate: { type: Date },
  cashAmount: { type: Number },
  creditLast4: { type: String },
  creditAmount: { type: Number },
  creditPayments: { type: Number },
  checkNumber: { type: String },
  checkAccount: { type: String },
  checkBank: { type: String },
  checkAmount: { type: Number },
  checkDueDate: { type: Date },
  bankTransferNumber: { type: String },
  bankTransferAccount: { type: String },
  bankTransferBank: { type: String },
  bankTransferAmount: { type: Number },
  bankTransferDueDate: { type: Date }
});

export default mongoose.model<IIncome>('Income', IncomeSchema);
