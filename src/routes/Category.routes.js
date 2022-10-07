import { Router } from 'express';
import ensure from '../middlewares/Ensurances.middleware';
import category from '../controllers/Category.controller';

const route = Router();

route.post('', ensure.requiredFields('name'), ensure.noClones, category.create);
route.get('', category.read);

export default route;
