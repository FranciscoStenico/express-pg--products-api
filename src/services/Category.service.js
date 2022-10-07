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
}
