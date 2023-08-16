const StateOfVacationService = require('../service/StateOfVacationService');

class StateOfVacationRouterHandler {
  async fetch(req, res, next) {
    const states = await new StateOfVacationService().fetchStates();
    res.send(states);
  }

  async insert(req, res, next) {
    const stateData = req.body;
    const result = await new StateOfVacationService().insertState(stateData);
    res.send(result);
  }

  async update(req, res, next) {
    const stateId = req.params.id;
    const updateData = req.body;
    const result = await new StateOfVacationService().updateState(stateId, updateData);
    res.send(result);
  }

  async delete(req, res, next) {
    const stateId = req.params.id;
    const result = await new StateOfVacationService().deleteState(stateId);
    res.send(result);
  }
}

module.exports = new StateOfVacationRouterHandler();
