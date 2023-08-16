const { connection } = require('../database/mysql');
const StateOfVacationCacheAccessor = require('../cache-accessor/StateOfVacationCacheAccessor');

class StateOfVacationDataAccessor {
  async fetch() {
    try {
      if (StateOfVacationCacheAccessor.findCache('fetch_all_states')) {
        return StateOfVacationCacheAccessor.get('fetch_all_states');
      } else {
        const [rows] = await connection.query('SELECT * FROM state_of_vacation');
        connection.release();
        StateOfVacationCacheAccessor.set('fetch_all_states', rows);
        return rows;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async insert(stateData) {
    try {
      await connection.beginTransaction(); // Begin transaction
      const [result] = await connection.query('INSERT INTO state_of_vacation SET ?', stateData);
      await connection.commit(); // Commit transaction

      // Update or add to cache after insert
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        cachedStates.push({ id: result.insertId, ...stateData });
      }

      connection.release();
      return result;
    } catch (err) {
      if (connection) {
        await connection.rollback(); // Rollback transaction in case of failure
        connection.release();
      }
      throw new Error(err);
    }
  }

  async update(stateId, updateData) {
    try {
      await connection.beginTransaction(); // Begin transaction
      const [result] = await connection.query('UPDATE state_of_vacation SET ? WHERE id = ?', [updateData, stateId]);
      await connection.commit(); // Commit transaction

      // Update cache after update
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        const updatedIndex = cachedStates.findIndex(state => state.id === stateId);
        if (updatedIndex !== -1) {
          cachedStates[updatedIndex] = { ...cachedStates[updatedIndex], ...updateData };
        }
      }

      connection.release();
      return result;
    } catch (err) {
      if (connection) {
        await connection.rollback(); // Rollback transaction in case of failure
        connection.release();
      }
      throw new Error(err);
    }
  }

  async softDelete(stateId) {
    try {
      await connection.beginTransaction(); // Begin transaction
      const [result] = await connection.query('DELETE FROM state_of_vacation WHERE id = ?', [stateId]);
      await connection.commit(); // Commit transaction

      // Remove from cache after delete
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        const deletedIndex = cachedStates.findIndex(state => state.id === stateId);
        if (deletedIndex !== -1) {
          cachedStates.splice(deletedIndex, 1);
        }
      }

      connection.release();
      return result;
    } catch (err) {
      if (connection) {
        await connection.rollback(); // Rollback transaction in case of failure
        connection.release();
      }
      throw new Error(err);
    }
  }
}

module.exports = StateOfVacationDataAccessor;
