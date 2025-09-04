import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/accounting')
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error('MongoDB connection error:', err));



import incomeRoutes from './routes/income';
import expenseRoutes from './routes/expense';
import reportRoutes from './routes/report';

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Accounting App API');
});

app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);
app.use('/report', reportRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
