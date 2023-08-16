const { pool } = require('../database/mysql');

class StateOfVacationDataAccessor {
  async fetch() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM state_of_vacation');
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }

  async insert(stateData) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('INSERT INTO state_of_vacation SET ?', stateData);
      connection.release();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(stateId, updateData) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('UPDATE state_of_vacation SET ? WHERE id = ?', [updateData, stateId]);
      connection.release();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async softDelete(stateId) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('DELETE FROM state_of_vacation WHERE id = ?', [stateId]);
      connection.release();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = StateOfVacationDataAccessor;
