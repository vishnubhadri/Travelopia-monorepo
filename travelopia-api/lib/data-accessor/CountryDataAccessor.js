const { connection } = require('../database/mysql'); // Import your database configuration
const CountryCacheAccessor = require('../cache-accessor/CountryCacheAccessor'); // Import your cache accessor

class CountryDataAccessor {
    async fetch() {
        const pool = connection.getConnection();
        try {
            if (CountryCacheAccessor.findCache('fetch_all_country')) {
                return CountryCacheAccessor.get('fetch_all_country');
            } else {
                const [rows] = await pool.query(`SELECT id,country_name,country_image_url,description,is_active FROM countries WHERE is_active = 1`);
                CountryCacheAccessor.set('fetch_all_country', rows);
                return rows;
            }
        } catch (err) {
            throw new Error(err);
        }
        finally {
            pool.release();
        }
    }

    async insert(countryData) {
        const pool = connection.getConnection();
        try {
            await pool.beginTransaction();
            const [result] = await pool.query('INSERT INTO countries SET ?', countryData);
            await pool.commit(); // Commit transaction

            // Update cache after adding
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries.push({ id: result.insertId, ...countryData });
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

    async update(countryId, updateData) {
        const pool = connection.getConnection();
        try {
            await pool.beginTransaction();
            const [result] = await pool.query('UPDATE countries SET ? WHERE id = ?', [updateData, countryId]);
            await pool.commit(); // Commit transaction

            // Update cache with the modified data
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                const updatedIndex = cachedCountries.findIndex(country => country.id === countryId);
                if (updatedIndex !== -1) {
                    cachedCountries[updatedIndex] = { ...cachedCountries[updatedIndex], ...updateData };
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

    async softDelete(countryId) {
        const pool = connection.getConnection();
        try {
            await pool.beginTransaction();
            const [result] = await pool.query('UPDATE countries SET is_active = 0 WHERE id = ?', [countryId]);
            // Update status of related enquiry records to "Archive"
            const [updateEnquiries] = await pool.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE country_id = ?', ['Archive', countryId]);

            await pool.commit(); // Commit transaction

            // Update cache after deleting
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries = cachedCountries.filter(country => country.id !== countryId);
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

module.exports = CountryDataAccessor;
