import express from 'express';
import 'dotenv/config';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import { startDatabase } from './database';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use('/category', categoryRoutes);
app.use('/products', productRoutes);

app.listen(PORT, async () => {
  await startDatabase();
  console.log(`Server running on port ${PORT}`);
});

export default app;
