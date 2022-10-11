import { Router } from 'express';
import ensure from '../middlewares/Ensurances.middleware'
import product from '../controllers/Product.controller';

const route = Router();

route.post('', ensure.requiredFields('name', 'price'), ensure.noClones, product.create);
route.get('', product.read);
route.get('/:id', product.readById);
route.get('/category/:id', ensure.categoryExists, product.readByCategory);
route.patch('/:id', product.update);
route.delete('/:id', product.delete);

export default route;
