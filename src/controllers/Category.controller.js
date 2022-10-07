import service from '../services/Category.service';

export default class CategoryController {
  static async create(request, response) {
    try {
      const { name } = request.body;
      const newCategory = await service.create(name);

      return response.status(201).send(newCategory);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  static async read(_, response) {
    try {
      const categoryList = await service.read();
      return response.status(200).send(categoryList);
    } catch ({ message }) {
      return response.status(404).send({ message });
    }
  }
}
