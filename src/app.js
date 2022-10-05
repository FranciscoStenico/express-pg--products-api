import express from 'express';
import 'dotenv/config';
import categoryRoute from './routes/Category.routes';
import { startDatabase } from './database';

const PORT = process.env.DB_PORT || 3333;
const app = express();

app.use(express.json());
app.use('/category', categoryRoute);

export default app.listen(PORT, async () => {
  await startDatabase();
  console.log(`Server running on port ${PORT}`);
});
