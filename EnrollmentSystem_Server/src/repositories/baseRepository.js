import { query } from '../config/dbConfig.js';

export class BaseRepository {
  constructor(tableName, model, idColumn = 'id') {
    this.tableName = tableName; // Table name in the database
    this.model = model;        // Model used for mapping
    this.idColumn = idColumn;  // Column used as the identifier (default: 'id')
  }

  // Generic create method
  async create(data) {
    console.log("this is create PERSON repo CREATE")

    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const queryText = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await query(queryText, values);

    return this.model.fromDatabase(result.rows[0]);
  }

  // Generic update method
  async update(id, data) {
    const setClause = Object.keys(data)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = Object.values(data);
    values.push(id); // Add ID for the WHERE clause

    const queryText = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.idColumn} = $${values.length} RETURNING *`;
    const result = await query(queryText, values);

    return result.rows.length > 0 ? this.model.fromDatabase(result.rows[0]) : null;
  }

  // Generic delete method
  async delete(id) {
    const queryText = `DELETE FROM ${this.tableName} WHERE ${this.idColumn} = $1 RETURNING *`;
    const result = await query(queryText, [id]);

    return result.rows.length > 0 ? this.model.fromDatabase(result.rows[0]) : null;
  }

  // Generic getById method
  async getById(id) {
    const queryText = `SELECT * FROM ${this.tableName} WHERE ${this.idColumn} = $1`;
    const result = await query(queryText, [id]);

    return result.rows.length > 0 ? this.model.fromDatabase(result.rows[0]) : null;
  }

  // Generic getAll method
  async getAll() {
    console.log("get all students BASE");

    const queryText = `SELECT * FROM ${this.tableName}`;
    const result = await query(queryText);

    return result.rows.map(row => this.model.fromDatabase(row));
  }

  // Generic getByEmail method (useful for persons)
  async getByEmail(email) {
    const queryText = `SELECT * FROM ${this.tableName} WHERE email = $1`;
    const result = await query(queryText, [email]);

    return result.rows.length > 0 ? this.model.fromDatabase(result.rows[0]) : null;
  }

  // Get with custom joins (used in StudentRepository for persons and students)
  async getWithJoin(joinQuery, params = []) {
    const result = await query(joinQuery, params);
    //console.log("Raw query result:", result);  // Add this line to see what the result looks like
    return result.rows.map(row => this.model.fromDatabase(row));
  }
  
}

export default BaseRepository;
