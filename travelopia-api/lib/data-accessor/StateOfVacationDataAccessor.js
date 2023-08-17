const { connection } = require('../database/mysql');
const StateOfVacationCacheAccessor = require('../cache-accessor/StateOfVacationCacheAccessor');

class StateOfVacationDataAccessor {
  async fetch() {
    const pool = connection.getConnection();
    try {
      if (StateOfVacationCacheAccessor.findCache('fetch_all_states')) {
        return StateOfVacationCacheAccessor.get('fetch_all_states');
      } else {
        const [rows] = await pool.query('SELECT * FROM state_of_vacation');
        StateOfVacationCacheAccessor.set('fetch_all_states', rows);
        return rows;
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      pool.release();
    }
  }

  async insert(stateData) {
    const pool = connection.getConnection();
    try {
      await pool.beginTransaction(); // Begin transaction
      const [result] = await pool.query('INSERT INTO state_of_vacation SET ?', stateData);
      await pool.commit(); // Commit transaction

      // Update or add to cache after insert
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        cachedStates.push({ id: result.insertId, ...stateData });
      }

      return result;
    } catch (err) {
      if (pool) {
        await pool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      pool.release();
    }
  }

  async update(stateId, updateData) {
    const pool = connection.getConnection();
    try {
      await pool.beginTransaction(); // Begin transaction
      const [result] = await pool.query('UPDATE state_of_vacation SET ? WHERE id = ?', [updateData, stateId]);
      await pool.commit(); // Commit transaction

      // Update cache after update
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        const updatedIndex = cachedStates.findIndex(state => state.id === stateId);
        if (updatedIndex !== -1) {
          cachedStates[updatedIndex] = { ...cachedStates[updatedIndex], ...updateData };
        }
      }

      return result;
    } catch (err) {
      if (pool) {
        await pool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      pool.release();
    }
  }

  async softDelete(stateId) {
    const pool = connection.getConnection();
    try {
      await pool.beginTransaction(); // Begin transaction
      const [result] = await pool.query('DELETE FROM state_of_vacation WHERE id = ?', [stateId]);
      await pool.commit(); // Commit transaction

      // Remove from cache after delete
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        const deletedIndex = cachedStates.findIndex(state => state.id === stateId);
        if (deletedIndex !== -1) {
          cachedStates.splice(deletedIndex, 1);
        }
      }

      return result;
    } catch (err) {
      if (pool) {
        await pool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      pool.release();
    }
  }
}

module.exports = StateOfVacationDataAccessor;
