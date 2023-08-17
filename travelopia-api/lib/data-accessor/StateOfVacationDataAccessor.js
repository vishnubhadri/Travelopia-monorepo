const { pool } = require('../database/mysql');
const StateOfVacationCacheAccessor = require('../cache-accessor/StateOfVacationCacheAccessor');
const { EnquiryStatus } = require('../constants/constant')
class StateOfVacationDataAccessor {
  async fetch() {
    const connectionPool = await pool.getConnection();
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
      await connectionPool.release()
    }
  }

  async fetchById(id) {
    const connectionPool = await pool.getConnection();
    try {
      if (StateOfVacationCacheAccessor.findCache('fetch_all_states')) {
        const stateOfVacationCache = StateOfVacationCacheAccessor.get('fetch_all_states');
        const cachedState = stateOfVacationCache.find(state => state.id === id);
        if (cachedState) {
          return cachedState;
        }
      }

      const [rows] = await connectionPool.query('SELECT * FROM state_of_vacation WHERE id = ?', [id]);
      if (rows.length > 0) {
        if (StateOfVacationCacheAccessor.findCache('fetch_all_states')) {
          const stateOfVacationCache = StateOfVacationCacheAccessor.get('fetch_all_states');
          stateOfVacationCache.push(rows[0])
          StateOfVacationCacheAccessor.set('fetch_all_states', stateOfVacationCache);
        }
        return rows;
      } else {
        return null; // No state of vacation found with the provided id
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      await connectionPool.release();
    }
  }


  async insert(stateData) {
    const connectionPool = await pool.getConnection();
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
      if (connectionPool) {
        await connectionPool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      await connectionPool.release()
    }
  }

  async update(stateId, updateData) {
    const connectionPool = await pool.getConnection();
    try {
      await connectionPool.beginTransaction(); // Begin transaction
      const [result] = await connectionPool.query('UPDATE state_of_vacation SET ? WHERE id = ?', [updateData, stateId]);
      await connectionPool.commit(); // Commit transaction

      // Update cache after update
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        const updatedIndex = cachedStates.findIndex(state => state.id == stateId);
        if (updatedIndex !== -1) {
          cachedStates[updatedIndex] = { ...cachedStates[updatedIndex], ...updateData };
        }
      }

      return result;
    } catch (err) {
      if (connectionPool) {
        await connectionPool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      await connectionPool.release()
    }
  }

  async softDelete(stateId) {
    const connectionPool = await pool.getConnection();
    try {
      await connectionPool.beginTransaction(); // Begin transaction

      // Update related enquiry records to null (or another appropriate value) to remove the dependency
      await connectionPool.query('UPDATE enquiry_records SET stage_id = null, status_of_enquiry = ? WHERE stage_id = ?', [EnquiryStatus.ARCHIVE,stateId]);

      // Now you can delete the state_of_vacation record
      const [result] = await connectionPool.query('UPDATE state_of_vacation SET is_active=0 WHERE id = ?', [stateId]);
      await connectionPool.commit(); // Commit transaction

      // Remove from cache after delete
      const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
      if (cachedStates) {
        const deletedIndex = cachedStates.findIndex(state => state.id == stateId);
        if (deletedIndex !== -1) {
          cachedStates.splice(deletedIndex, 1);
        }
      }

      return result;
    } catch (err) {
      if (connectionPool) {
        await connectionPool.rollback(); // Rollback transaction in case of failure
      }
      throw new Error(err);
    } finally {
      await connectionPool.release();
    }
  }
}

module.exports = StateOfVacationDataAccessor;
