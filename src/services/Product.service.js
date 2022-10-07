import database from '../database';

export default class ProductService {
  static async create(name, price, category) {
    try {
      const res = await database.query(
        `
        INSERT INTO
          products(name, price, category_id) 
        VALUES
          ($1, $2, $3) 
        RETURNING name, id`,
        [name, price, category]
      );

      return { message: 'Product created', product: res.rows[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async read() {
    try {
      const res = await database.query(`
        SELECT
          prod.name, prod.price,
          cat.name category
        FROM products prod
        LEFT JOIN categories cat ON prod.category_id = cat.id
      `);
      return res.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async readById(id) {
    try {
      const res = await database.query(
        `
        SELECT
          prod.name, prod.price,
          cat.name category
        FROM 
          products prod
        LEFT JOIN categories cat ON prod.category_id = cat.id
        WHERE prod.id = $1
        `,
        [id]
      );

      return res.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async readByCategory(categoryId) {
    try {
      const res = await database.query(
        `
        SELECT
          prod.name, prod.price, cat.name category
        FROM 
          products prod
        LEFT JOIN categories cat ON prod.category_id = cat.id
        WHERE cat.id = $1
        `,
        [categoryId]
      );

      return res.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(body, id) {
    try {
      let query = 'UPDATE products SET ';
      const keys = Object.keys(body);
      const values = Object.values(body);

      keys.forEach((key, index, arr) => {
        query +=
          index === arr.length - 1
            ? `${key} = \$${index + 1} WHERE id = \$${arr.length + 1} RETURNING name, id`
            : `${key} = \$${index + 1}, `;
      });
      console.log('ok')
      const res = await database.query(query, [...values, id]);

      return { message: 'Product updated', product: res.rows[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const res = await database.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
      );

      if (!res.rows[0]) {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
