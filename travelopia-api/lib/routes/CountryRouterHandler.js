const CountryService = require('../service/CountryService');

class CountryRouterHandler {
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const response = await new CountryService().updateCountry({ countryId: id, updateData });
      res.send(response);
    }
    catch (err) {
      next(err);
    }
  }

  async fetch(req, res, next) {
    try {
      const response = await new CountryService().fetchCountries(req);
      res.send(response);
    }
    catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params; // Change to req.params.ids
      const response = await new CountryService().deleteCountries({ id: id }); // Change to countryIds
      res.send(response);
    }
    catch (err) {
      next(err);
    }
  }

  async insert(req, res, next) {
    try {
      const countryData = req.body;
      const response = await new CountryService().addCountry({ countryData });
      res.send(response);
    }
    catch (err) {
      next(err);
    }
  }
}

module.exports = new CountryRouterHandler();
