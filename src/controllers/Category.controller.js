import service from '../services/Category.service';

export default class CategoryController {
  static async read(_, response) {
    try {
      const categoryList = await service.read();
      return response.status(200).send(categoryList);
    } catch ({ message }) {
      return response.status(404).send({ message });
    }
  }
}
