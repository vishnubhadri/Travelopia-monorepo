const StateOfVacationService = require('../service/StateOfVacationService');

class StateOfVacationRouterHandler {
  constructor() {
    this.stateService = new StateOfVacationService();
  }

  async fetch(req, res, next) {
    const states = await this.stateService.fetchStates();
    res.send(states);
  }

  async insert(req, res, next) {
    const stateData = req.body;
    const result = await this.stateService.insertState(stateData);
    res.send(result);
  }

  async update(req, res, next) {
    const stateId = req.params.id;
    const updateData = req.body;
    const result = await this.stateService.updateState(stateId, updateData);
    res.send(result);
  }

  async delete(req, res, next) {
    const stateId = req.params.id;
    const result = await this.stateService.deleteState(stateId);
    res.send(result);
  }
}

module.exports = new StateOfVacationRouterHandler();
