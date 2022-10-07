import database from '../database';

export default class CategoryServices {
  static async create(name) {
    try {
      const res = await database.query(
        'INSERT INTO categories(name) VALUES ($1) RETURNING name, id',
        [name]
      );

      return { message: 'Category created', category: res.rows[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async read() {
    try {
      const res = await database.query('SELECT * FROM categories');
      return res.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async readById(id) {
    try {
      const res = await database.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
      );

      return res.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(id, name) {
    try {
      const res = await database.query(
        'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
      );
      
      return { message: 'Category updated', category: res.rows[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const res = await database.query(
        'DELETE FROM categories WHERE id = $1 RETURNING *',
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
