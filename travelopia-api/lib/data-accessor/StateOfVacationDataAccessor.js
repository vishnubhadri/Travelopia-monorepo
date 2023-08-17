const { pool } = require('../database/mysql');
const StateOfVacationCacheAccessor = require('../cache-accessor/StateOfVacationCacheAccessor');

class StateOfVacationDataAccessor {
  async fetch() {
    const connectionPool = pool.promise();
    try {
      if (StateOfVacationCacheAccessor.findCache('fetch_all_states')) {
        return StateOfVacationCacheAccessor.get('fetch_all_states');
      } else {
        const [rows] = await connectionPool.query('SELECT * FROM state_of_vacation');
        StateOfVacationCacheAccessor.set('fetch_all_states', rows);
        return rows;
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      connectionPool.releaseConnection();
    }
  }

  async insert(stateData) {
    const connectionPool = pool.promise();
    try {
      await connectionPool.beginTransaction(); // Begin transaction
      const [result] = await connectionPool.query('INSERT INTO state_of_vacation SET ?', stateData);
      await connectionPool.commit(); // Commit transaction

      // Update or add to cache after insert
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        cachedStates.push({ id: result.insertId, ...stateData });
      }

      return result;
    } catch (err) {
      if (pool) {
        await connectionPool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      connectionPool.releaseConnection();
    }
  }

  async update(stateId, updateData) {
    const connectionPool = pool.promise();
    try {
      await connectionPool.beginTransaction(); // Begin transaction
      const [result] = await connectionPool.query('UPDATE state_of_vacation SET ? WHERE id = ?', [updateData, stateId]);
      await connectionPool.commit(); // Commit transaction

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
        await connectionPool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      connectionPool.releaseConnection();
    }
  }

  async softDelete(stateId) {
    const connectionPool = pool.promise();
    try {
      await connectionPool.beginTransaction(); // Begin transaction
      const [result] = await connectionPool.query('DELETE FROM state_of_vacation WHERE id = ?', [stateId]);
      await connectionPool.commit(); // Commit transaction

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
        await connectionPool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      connectionPool.releaseConnection();
    }
  }
}

module.exports = StateOfVacationDataAccessor;
