const CountryService = require('../service/CountryService');

class CountryRouterHandler {
  async update(req, res, next) {
    const { id } = req.params;
    const updateData = req.body;
    const response = await new CountryService().updateCountry({ countryId: id, updateData });
    res.send(response);
  }

  async fetch(req, res, next) {
    const response = await new CountryService().fetchCountries(req);
    res.send(response);
  }

  async delete(req, res, next) {
    const { id } = req.params; // Change to req.params.ids
    const response = await new CountryService().deleteCountries({ id: id }); // Change to countryIds
    res.send(response);
  }

  async insert(req, res, next) {
    const countryData = req.body;
    const response = await new CountryService().addCountry({ countryData });
    res.send(response);
  }
}

module.exports = new CountryRouterHandler();
