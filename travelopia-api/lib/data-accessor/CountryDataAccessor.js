const { pool } = require('../database/mysql'); // Import your database configuration
const CountryCacheAccessor = require('../cache-accessor/CountryCacheAccessor'); // Import your cache accessor

class CountryDataAccessor {
    async fetch() {
        const connectionPool =await pool.getConnection();
        try {
            if (CountryCacheAccessor.findCache('fetch_all_country')) {
                return CountryCacheAccessor.get('fetch_all_country');
            } else {
                const [rows] = await  connectionPool.query(`SELECT id,country_name,country_image_url,description  FROM country WHERE is_active = 1`);
                CountryCacheAccessor.set('fetch_all_country', rows);
                return rows;
            }
        } catch (err) {
            throw new Error(err);
        }
        finally {
            await connectionPool.release()
        }
    }

    async insert(countryData) {
        const connectionPool =await pool.getConnection();
        try {
            await connectionPool.beginTransaction();
            const [result] = await connectionPool.query('INSERT INTO country SET ?', countryData);
            await connectionPool.commit(); // Commit transaction

            // Update cache after adding
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries.push({ id: result.insertId, ...countryData });
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

    async update(countryId, updateData) {
        const connectionPool =await pool.getConnection();
        try {
            await connectionPool.beginTransaction();
            const [result] = await connectionPool.query('UPDATE country SET ? WHERE id = ?', [updateData, countryId]);
            await connectionPool.commit(); // Commit transaction

            // Update cache with the modified data
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                const updatedIndex = cachedCountries.findIndex(country => country.id == countryId);
                if (updatedIndex !== -1) {
                    cachedCountries[updatedIndex] = { ...cachedCountries[updatedIndex], ...updateData };
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

    async softDelete(countryId) {
        const connectionPool =await pool.getConnection();
        try {
            await connectionPool.beginTransaction();
            const [result] = await connectionPool.query('UPDATE country SET is_active = 0 WHERE id = ?', [countryId]);
            // Update status of related enquiry records to "Archive"
            const [updateEnquiries] = await connectionPool.query('UPDATE enquiry_records SET status_of_enquiry = ? WHERE country_id = ?', ['Archive', countryId]);

            await connectionPool.commit(); // Commit transaction

            // Update cache after deleting
            let cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries = cachedCountries.filter(country => country.id != countryId);
                CountryCacheAccessor.set('fetch_all_country',cachedCountries)
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
}

module.exports = CountryDataAccessor;
