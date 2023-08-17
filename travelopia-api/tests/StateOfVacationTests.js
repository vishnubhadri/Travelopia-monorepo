const assert = require('chai').assert;
const sinon = require('sinon');
const StateOfVacationService = require('../lib/service/StateOfVacationService');

describe('StateOfVacationService', function () {
    let stateOfVacationService;

    beforeEach(function () {
        this.sandbox = sinon.createSandbox();
        stateOfVacationService = new StateOfVacationService();
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('should fetch states', async function () {
        const fetchStub = this.sandbox.stub(stateOfVacationService.stateDataAccessor, 'fetch').resolves([{ id: 1, name: 'State 1' }]);
        
        const states = await stateOfVacationService.fetchStates();

        assert.deepEqual(states, [{ id: 1, name: 'State 1' }]);
        assert.isTrue(fetchStub.calledOnce);
    });

    it('should insert a state', async function () {
        const insertStub = this.sandbox.stub(stateOfVacationService.stateDataAccessor, 'insert').resolves({ insertId: 2 });
        
        const result = await stateOfVacationService.insertState({ name: 'New State' });

        assert.deepEqual(result, { insertId: 2 });
        assert.isTrue(insertStub.calledOnce);
    });

    it('should update a state', async function () {
        const updateStub = this.sandbox.stub(stateOfVacationService.stateDataAccessor, 'update').resolves({ affectedRows: 1 });
        
        const result = await stateOfVacationService.updateState(1, { name: 'Updated State' });

        assert.deepEqual(result, { affectedRows: 1 });
        assert.isTrue(updateStub.calledOnce);
    });

    it('should delete a state', async function () {
        const deleteStub = this.sandbox.stub(stateOfVacationService.stateDataAccessor, 'softDelete').resolves({ affectedRows: 1 });
        
        const result = await stateOfVacationService.deleteState(1);

        assert.deepEqual(result, { affectedRows: 1 });
        assert.isTrue(deleteStub.calledOnce);
    });
});
