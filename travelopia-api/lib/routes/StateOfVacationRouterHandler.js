const StateOfVacationService = require('../service/StateOfVacationService');

class StateOfVacationRouterHandler {
  async fetch(req, res, next) {
    try {
      const states = await new StateOfVacationService().fetchStates();
      res.send(states);
    }
    catch (err) {
      next(err);
    }
  }

  async insert(req, res, next) {
    try {
      const stateData = req.body;
      const result = await new StateOfVacationService().insertState(stateData);
      res.send(result);
    }
    catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const stateId = req.params.id;
      const updateData = req.body;
      const result = await new StateOfVacationService().updateState(stateId, updateData);
      res.send(result);
    }
    catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const stateId = req.params.id;
      const result = await new StateOfVacationService().deleteState(stateId);
      res.send(result);
    }
    catch (err) {
      next(err);
    }
  }
}

module.exports = new StateOfVacationRouterHandler();
