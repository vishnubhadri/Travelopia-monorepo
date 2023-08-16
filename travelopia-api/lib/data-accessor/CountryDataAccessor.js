// const { connection } = require('../database/mysql'); // Import your database configuration

class CountryDataAccessor {
    async fetch() {
        try {
            // const [rows] = await connection.query(`SELECT id,country_name,country_image_url,description,is_active FROM countries WHERE is_active = 1`);
            // connection.release();
            // return rows;
            return ['Apple'];
        } catch (err) {
            throw new Error(err);
        }
    }

    async insert(countryData) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query('INSERT INTO countries SET ?', countryData);
            connection.release();
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(countryId, updateData) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query('UPDATE countries SET ? WHERE id = ?', [updateData, countryId]);
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

module.exports = CountryDataAccessor;
