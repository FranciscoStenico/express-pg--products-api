import database from '../database';

export default class CategoryServices {
  static async read() {
    try {
      const res = await database.query('SELECT * FROM categories');

      return res.rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
