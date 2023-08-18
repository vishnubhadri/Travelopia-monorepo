const { pool } = require('../database/mysql'); // Import your database configuration
const StateOfVacationDataAccessor = require('./StateOfVacationDataAccessor')
class EnquiryDataAccessor {
    async fetch() {
        const connectionPool =await pool.getConnection();
        try {
            const [rows] = await connectionPool.query('SELECT * FROM enquiry_records');
            return rows;
        } catch (err) {
            throw new Error(err);
        } finally {
            await connectionPool.release()
        }
    }

    async insert(enquiryData) {
        const connectionPool = await pool.getConnection();
        try {
            const existingStage=await new StateOfVacationDataAccessor().fetchById(enquiryData.stage_id);
    
            if (!existingStage||!Object.keys(existingStage).length) {
                throw new Error('stage_id not exist');
            }

            const [result] = await connectionPool.query('INSERT INTO enquiry_records SET ?', enquiryData);
            return result;
        } catch (err) {
            throw new Error(err);
        } finally {
            connectionPool.release();
        }
    }    

    async update(enquiryId, updateData) {
        const connectionPool =await pool.getConnection();
        try {
            await connectionPool.beginTransaction(); // Begin transaction

            const [result] = await connectionPool.query('UPDATE enquiry_records SET ? WHERE id = ?', [updateData, enquiryId]);
            await connectionPool.commit(); // Commit transaction

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

    async updateStatus(enquiryId, enquiryStatus) {
        const connectionPool =await pool.getConnection();
        try {
            await connectionPool.beginTransaction(); // Begin transaction

            const [result] = await connectionPool.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE id = ?', [enquiryStatus, enquiryId]);
            await connectionPool.commit(); // Commit transaction

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

    async softDelete(enquiryId) {
        const connectionPool =await pool.getConnection();
        
        try {
            await connectionPool.beginTransaction(); // Begin transaction

            const [result] = await connectionPool.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE id = ?', ['Archive', enquiryId]);

            await connectionPool.commit(); // Commit transaction

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
}

module.exports = EnquiryDataAccessor;
