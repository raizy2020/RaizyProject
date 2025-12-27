import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/accounting')
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error('MongoDB connection error:', err));




import incomeRoutes from './Routes/income';
import expenseRoutes from './Routes/expense';
import reportRoutes from './Routes/report';
import categoryRoutes from './Routes/category';
import clientRoutes from './Routes/client';
import supplierRoutes from './Routes/supplier';
import userRoutes from './Routes/user';
import receiptRoutes from './Routes/receipt';

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Accounting App API');
});


app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);
app.use('/report', reportRoutes);
app.use('/category', categoryRoutes);
app.use('/client', clientRoutes);
app.use('/supplier', supplierRoutes);
app.use('/user', userRoutes);
app.use('/receipt', receiptRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
