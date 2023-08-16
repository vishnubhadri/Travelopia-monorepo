const CountryDataAccessor = require("../data-accessor/CountryDataAccessor");
const CountryCacheAccessor = require('../cache-accessor/CountryCacheAccessor');

class CountryService {
    constructor() {
        this.CountryDataAccessor = new CountryDataAccessor();
    }
    
    async fetchCountries(payload) {
        if (CountryCacheAccessor.findCache('fetch_all_country')) {
            return CountryCacheAccessor.get('fetch_all_country');
        } else {
            const countries = await this.CountryDataAccessor.fetch();
            CountryCacheAccessor.set('fetch_all_country', countries);
            return countries;
        }
    }
    
    async updateCountry(payload) {
        const { countryId, updateData } = payload;
        try {
            const result = await this.CountryDataAccessor.update(countryId, updateData);
            
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
            throw new Error(err);
        }
    }
    
    async deleteCountries(payload) {
        const { countryIds } = payload;
        try {
            const result = await Promise.all(countryIds.map(id => this.CountryDataAccessor.softDelete(id)));
            
            // Update cache after deleting
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries = cachedCountries.filter(country => !countryIds.includes(country.id));
            }
            
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
    
    async addCountry(payload) {
        const { countryData } = payload;
        try {
            const result = await this.CountryDataAccessor.insert(countryData);
            
            // Update cache after adding
            const cachedCountries = CountryCacheAccessor.get('fetch_all_country');
            if (cachedCountries) {
                cachedCountries.push({ id: result.insertId, ...countryData });
            }
            
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = CountryService;