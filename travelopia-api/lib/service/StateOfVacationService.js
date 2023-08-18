const StateOfVacationDataAccessor = require('../data-accessor/StateOfVacationDataAccessor');

class StateOfVacationService {
    constructor() {
        this.stateDataAccessor = new StateOfVacationDataAccessor();
    }

    async fetchStates() {
        const states = await this.stateDataAccessor.fetch();
        return states;
    }
    async fetchAllStates() {
        const states = await this.stateDataAccessor.fetchAll();
        return states;
    }

    async insertState(stateData) {
        const result = await this.stateDataAccessor.insert(stateData);
        return result;
    }

    async updateState(stateId, updateData) {
        const result = await this.stateDataAccessor.update(stateId, updateData);
        return result;
    }

    async deleteState(stateId) {
        const result = await this.stateDataAccessor.softDelete(stateId);
        
        return result;
    }
}

module.exports = StateOfVacationService;
