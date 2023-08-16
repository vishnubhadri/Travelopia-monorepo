const StateOfVacationDataAccessor = require('../data-accessor/StateOfVacationDataAccessor');
const StateOfVacationCacheAccessor = require('../cache-accessor/StateOfVacationCacheAccessor');

class StateOfVacationService {
    constructor() {
        this.stateDataAccessor = new StateOfVacationDataAccessor();
    }

    async fetchStates() {
        if (StateOfVacationCacheAccessor.findCache('fetch_all_states')) {
            return StateOfVacationCacheAccessor.get('fetch_all_states');
        } else {
            const states = await this.stateDataAccessor.fetch();
            StateOfVacationCacheAccessor.set('fetch_all_states', states);
            return states;
        }
    }

    async insertState(stateData) {
        const result = await this.stateDataAccessor.insert(stateData);
        // Update or add to cache after insert
        const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
        if (cachedStates) {
            cachedStates.push({ id: result.insertId, ...stateData });
        }
        return result;
    }

    async updateState(stateId, updateData) {
        const result = await this.stateDataAccessor.update(stateId, updateData);
        // Update cache after update
        const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
        if (cachedStates) {
            const updatedIndex = cachedStates.findIndex(state => state.id === stateId);
            if (updatedIndex !== -1) {
                cachedStates[updatedIndex] = { ...cachedStates[updatedIndex], ...updateData };
            }
        }
        return result;
    }

    async deleteState(stateId) {
        const result = await this.stateDataAccessor.softDelete(stateId);
        // Remove from cache after delete
        const cachedStates = StateOfVacationCacheAccessor.get('fetch_all_states');
        if (cachedStates) {
            const deletedIndex = cachedStates.findIndex(state => state.id === stateId);
            if (deletedIndex !== -1) {
                cachedStates.splice(deletedIndex, 1);
            }
        }
        return result;
    }
}

module.exports = StateOfVacationService;
