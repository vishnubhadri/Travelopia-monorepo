const assert = require('chai').assert;
const sinon = require('sinon');
const CountryService = require('../lib/service/CountryService');

describe('CountryService', function () {
    let countryService;

    beforeEach(function () {
        // Create a sinon sandbox to stub and mock methods
        this.sandbox = sinon.createSandbox();
        countryService = new CountryService();
    });

    afterEach(function () {
        // Restore all stubs and mocks
        this.sandbox.restore();
    });

    it('should fetch countries', async function () {
        const fetchStub = this.sandbox.stub(countryService.CountryDataAccessor, 'fetch').resolves([{ id: 1, name: 'Country 1' }]);

        const countries = await countryService.fetchCountries();

        assert.deepEqual(countries, [{ id: 1, name: 'Country 1' }]);
        assert.isTrue(fetchStub.calledOnce);
    });

    it('should update a country', async function () {
        const updateStub = this.sandbox.stub(countryService.CountryDataAccessor, 'update').resolves({ affectedRows: 1 });

        const result = await countryService.updateCountry({ countryId: 1, updateData: { name: 'Updated Country' } });

        assert.deepEqual(result, { affectedRows: 1 });
        assert.isTrue(updateStub.calledOnce);
    });

    it('should delete countries', async function () {
        const softDeleteStub = this.sandbox.stub(countryService.CountryDataAccessor, 'softDelete').resolves({ affectedRows: 1 });

        const result = await countryService.deleteCountries({ id: 1 });

        assert.deepEqual(result, { affectedRows: 1 });
        assert.isTrue(softDeleteStub.calledOnce);
    });

    it('should add a country', async function () {
        const insertStub = this.sandbox.stub(countryService.CountryDataAccessor, 'insert').resolves({ insertId: 3 });

        const result = await countryService.addCountry({ countryData: { name: 'New Country' } });

        assert.deepEqual(result, { insertId: 3 });
        assert.isTrue(insertStub.calledOnce);
    });
})