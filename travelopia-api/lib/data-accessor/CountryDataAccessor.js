const { connection } = require('../database/mysql'); // Import your database configuration
const CountryCacheAccessor = require('../cache-accessor/CountryCacheAccessor'); // Import your cache accessor

class CountryDataAccessor {
    async fetch() {
        try {
            if (CountryCacheAccessor.findCache('fetch_all_country')) {
                return CountryCacheAccessor.get('fetch_all_country');
            } else {
                const [rows] = await connection.query(`SELECT id,country_name,country_image_url,description,is_active FROM countries WHERE is_active = 1`);
                connection.release();
                CountryCacheAccessor.set('fetch_all_country', rows);
                return rows;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async insert(countryData) {
        try {
            await connection.beginTransaction();
            const [result] = await connection.query('INSERT INTO countries SET ?', countryData);
            await connection.commit(); // Commit transaction

            // Update cache after adding
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries.push({ id: result.insertId, ...countryData });
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

    async update(countryId, updateData) {
        try {
            await connection.beginTransaction();
            const [result] = await connection.query('UPDATE countries SET ? WHERE id = ?', [updateData, countryId]);
            await connection.commit(); // Commit transaction

            // Update cache with the modified data
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                const updatedIndex = cachedCountries.findIndex(country => country.id === countryId);
                if (updatedIndex !== -1) {
                    cachedCountries[updatedIndex] = { ...cachedCountries[updatedIndex], ...updateData };
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

    async softDelete(countryId) {
        try {
            await connection.beginTransaction();
            const [result] = await connection.query('UPDATE countries SET is_active = 0 WHERE id = ?', [countryId]);
            // Update status of related enquiry records to "Archive"
            const [updateEnquiries] = await connection.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE country_id = ?', ['Archive', countryId]);

            await connection.commit(); // Commit transaction

            // Update cache after deleting
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries = cachedCountries.filter(country => country.id !== countryId);
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

module.exports = CountryDataAccessor;
