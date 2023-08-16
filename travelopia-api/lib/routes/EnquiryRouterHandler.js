const EnquiryService = require('../service/EnquiryService');

class EnquiryRouterHandler {
  constructor() {
    this.EnquiryService = new EnquiryService();
  }

  async update(req, res, next) {
    const { enquiryId, updateData } = req.body; // Update with the actual request data
    try {
      const response = await this.EnquiryService.updateEnquiry({ enquiryId, updateData });
      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async fetch(req, res, next) {
    try {
      const response = await this.EnquiryService.fetchEnquiries();
      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async insert(req, res, next) {
    const { enquiryData } = req.body; // Update with the actual request data
    try {
      const response = await this.EnquiryService.addEnquiry({ enquiryData });
      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    const { enquiryId, newStatus } = req.body; // Update with the actual request data
    try {
      const response = await this.EnquiryService.updateEnquiryStatus({ enquiryId, newStatus });
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EnquiryRouterHandler();