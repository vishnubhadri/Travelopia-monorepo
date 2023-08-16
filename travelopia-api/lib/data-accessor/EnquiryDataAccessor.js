const { pool } = require('../database/mysql'); // Import your database configuration

class EnquiryDataAccessor {
    async fetch() {
        try {
            // Implement your fetch logic here
            // const [rows] = await connection.query(`SELECT id, full_name, email, country_id, ... FROM enquiry_records WHERE ...`);
            // connection.release();
            // return rows;
            return 'Apple';
        } catch (err) {
            throw new Error(err);
        }
    }

    async insert(enquiryData) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query('INSERT INTO enquiry_records SET ?', enquiryData);
            connection.release();
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(enquiryId, updateData) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query('UPDATE enquiry_records SET ? WHERE id = ?', [updateData, enquiryId]);
            connection.release();
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async softDelete(countryId) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query('UPDATE countries SET is_active = 0 WHERE id = ?', [countryId]);
            
            // Update status of related enquiry records to "Archive"
            const [updateEnquiries] = await connection.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE country_id = ?', ['Archive', countryId]);
            
            connection.release();
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
    }

module.exports = EnquiryDataAccessor;
