const CountryDataAccessor = require('../data-accessor/CountryDataAccessor');

class CountryService {
  constructor() {
    this.CountryDataAccessor = new CountryDataAccessor();
  }

  async fetchCountries() {
    const countries = await this.CountryDataAccessor.fetch();
    return countries;
  }
  async fetchAllCountries() {
    const countries = await this.CountryDataAccessor.fetchAll();
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
    const { id } = payload;
    try {
      const result = await this.CountryDataAccessor.softDelete(id);
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
