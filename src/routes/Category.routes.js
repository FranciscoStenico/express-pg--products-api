import { Router } from 'express';
import category from '../controllers/Category.controller';

const route = Router();

route.get('', category.read);

export default route;
