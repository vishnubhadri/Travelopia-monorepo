const EnquiryService = require('../service/EnquiryService');

class EnquiryRouterHandler {
  async update(req, res, next) {
    try {
      const response = await new EnquiryService().updateEnquiry({ enquiryId:req.params.id, updateData:req.body });
      res.send(response);
    } catch (err) {
      next(err);
    }
  }

  async fetch(req, res, next) {
    try {
      const response = await new EnquiryService().fetchEnquiries();
      res.send(response);
    } catch (err) {
      next(err);
    }
  }

  async insert(req, res, next) {
    try {
      const response = await new EnquiryService().addEnquiry(req.body);
      res.send(response);
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    const { enquiryId, newStatus } = req.body; // Update with the actual request data
    try {
      const response = await new EnquiryService().updateEnquiryStatus({ enquiryId, newStatus });
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EnquiryRouterHandler();