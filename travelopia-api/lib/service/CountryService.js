const CountryDataAccessor = require("../data-accessor/CountryDataAccessor")
const CountryCacheAccessor = require('../cache-accessor/CountryCacheAccessor')

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
            return  countries;
        }
    }
}

module.exports = CountryService