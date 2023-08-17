const { connection } = require('../database/mysql'); // Import your database configuration

class EnquiryDataAccessor {
    async fetch() {
        const pool = connection.getConnection();
        try {
            const [rows] = await pool.query('SELECT * FROM enquiry_records');
            return rows;
        } catch (err) {
            throw new Error(err);
        } finally {
            pool.release();
        }
    }

    async insert(enquiryData) {
        const pool = connection.getConnection();
        try {
            const [result] = await pool.query('INSERT INTO enquiry_records SET ?', enquiryData);
            return result;
        } catch (err) {
            throw new Error(err);
        } finally {
            pool.release();
        }
    }

    async update(enquiryId, updateData) {
        const pool = connection.getConnection();
        try {
            await pool.beginTransaction(); // Begin transaction

            const [result] = await pool.query('UPDATE enquiry_records SET ? WHERE id = ?', [updateData, enquiryId]);
            await pool.commit(); // Commit transaction

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

    async softDelete(enquiryId) {
        const pool = connection.getConnection();
        try {
            await pool.beginTransaction(); // Begin transaction

            const [result] = await pool.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE id = ?', ['Archive', enquiryId]);

            await pool.commit(); // Commit transaction

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

module.exports = EnquiryDataAccessor;
