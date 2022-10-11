import product from '../services/Product.service';
import category from '../services/Category.service';

export default class Ensurances {
  static requiredFields =
    (...fields) =>
    (request, response, next) => {
      const bodyKeys = Object.keys(request.body);
      const checkFields = fields.every((field) =>
        bodyKeys.some((key) => key === field)
      );

      if (!checkFields) {
        return response
          .status(400)
          .send({ message: `Missing required fields: ${fields.join(' | ')}` });
      }

      next();
    };

  static async noClones(request, response, next) {
    switch (request.baseUrl) {
      case '/products':
        try {
          const productList = await product.read();
          if (productList.some(({ name }) => name === request.body.name)) {
            return response
              .status(400)
              .send({ message: 'Product already on database' });
          }
          next();
        } catch ({ message }) {
          return response.status(400).send({ message });
        }
      default:
        try {
          const categoryList = await category.read();
          if (categoryList.some(({ name }) => name === request.body.name)) {
            return response
              .status(400)
              .send({ message: 'Category already on database' });
          }
          next();
        } catch ({ message }) {
          return response.status(400).send({ message });
        }
    }
  }

  static async categoryExists(request, response, next) {
    try {
      const { id } = request.params;
      await category.readById(id);

      next();
    } catch (error) {
      return response.status(404).send({ message: 'Category not found' });
    }
  }
}
