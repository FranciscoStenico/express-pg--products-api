import service from '../services/Product.service';

export default class ProductController {
  static async create(request, response) {
    try {
      const { name, price, category_id } = request.body;
      const newProduct = await service.create(name, price, category_id);

      return response.status(201).send(newProduct);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  static async read(_, response) {
    try {
      const productList = await service.read();
      return response.status(200).send(productList);
    } catch ({ message }) {
      return response.status(404).send({ message });
    }
  }

  static async readById(request, response) {
    try {
      const { id } = request.params;
      const targetedProduct = await service.readById(id);

      return response.status(200).send(targetedProduct);
    } catch ({ message }) {
      return response.status(404).send({ message });
    }
  }

  static async readByCategory(request, response) {
    try {
      const { categoryId } = request.params;
      const categoryProducts = service.readByCategory(categoryId);

      return response.status(200).send(categoryProducts);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  static async update(request, response) {
    try {
      const { id } = request.params;
      const body = request.body;
      const updatedProduct = await service.update(body, id);

      return response.status(200).send(updatedProduct);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  static async delete(request, response) {
    try {
      const { id } = request.params;
      service.delete(id);

      return response.status(204).send();
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }
}
