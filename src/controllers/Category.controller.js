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
      return response.status(400).send({ message });
    }
  }

  static async readById(request, response) {
    try {
      const { id } = request.params;
      const targetedCategory = await service.readById(id);

      return response.status(200).send(targetedCategory);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  static async update(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;
      const updatedCategory = await service.update(id, name);

      return response.status(200).send(updatedCategory);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  static async delete(request, response) {
    try {
      const { id } = request.params;
      await service.delete(id);

      return response.status(204).send();
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }
}
