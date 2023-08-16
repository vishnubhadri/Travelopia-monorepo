const CountryDataAccessor = require("../data-accessor/CountryDataAccessor");

class CountryService {
    constructor() {
        this.CountryDataAccessor = new CountryDataAccessor();
    }

    async fetchCountries(payload) {
        const countries = await this.CountryDataAccessor.fetch();
        return countries;
    }

    async updateCountry(payload) {
        const { countryId, updateData } = payload;
        try {
            const result = await this.CountryDataAccessor.update(countryId, updateData);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteCountries(payload) {
        const { countryIds } = payload;
        try {
            const result = await Promise.all(countryIds.map(id => this.CountryDataAccessor.softDelete(id)));
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addCountry(payload) {
        const { countryData } = payload;
        try {
            const result = await this.CountryDataAccessor.insert(countryData);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = CountryService;