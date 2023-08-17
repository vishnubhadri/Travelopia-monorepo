const { pool } = require('../database/mysql'); // Import your database configuration

class EnquiryDataAccessor {
    async fetch() {
        const connectionPool = pool.promise();
        try {
            const [rows] = await connectionPool.query('SELECT * FROM enquiry_records');
            return rows;
        } catch (err) {
            throw new Error(err);
        } finally {
            connectionPool.releaseConnection();
        }
    }

    async insert(enquiryData) {
        const connectionPool = connectionPool.promise();
        try {
            const [result] = await connectionPool.query('INSERT INTO enquiry_records SET ?', enquiryData);
            return result;
        } catch (err) {
            throw new Error(err);
        } finally {
            connectionPool.releaseConnection();
        }
    }

    async update(enquiryId, updateData) {
        const connectionPool = pool.promise();
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
            connectionPool.releaseConnection();
        }
    }

    async updateStatus(enquiryId, enquiryStatus) {
        const connectionPool = pool.promise();
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
            connectionPool.releaseConnection();
        }
    }

    async softDelete(enquiryId) {
        const connectionPool = pool.promise();
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
            connectionPool.releaseConnection();
        }
    }
}

module.exports = EnquiryDataAccessor;
