import { Router } from 'express';
import ensure from '../middlewares/Ensurances.middleware';
import category from '../controllers/Category.controller';

const route = Router();

route.post('', ensure.requiredFields('name'), ensure.noClones, category.create);
route.get('', category.read);
route.get('/:id', category.readById);
route.patch('/:id', category.update);
route.delete('/:id', category.delete);

export default route;
