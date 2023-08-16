const EnquiryDataAccessor = require('../data-accessor/EnquiryDataAccessor');

class EnquiryService {
  constructor() {
    this.EnquiryDataAccessor = new EnquiryDataAccessor();
  }

  async fetchEnquiries() {
    try {
      const enquiries = await this.EnquiryDataAccessor.fetch();
      return enquiries;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addEnquiry(enquiryData) {
    try {
      const result = await this.EnquiryDataAccessor.insert(enquiryData);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEnquiry(payload) {
    const { enquiryId, updateData } = payload;
    try {
      const result = await this.EnquiryDataAccessor.update(enquiryId, updateData);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEnquiryStatus(payload) {
    const { enquiryId, newStatus } = payload;
    try {
      const result = await this.EnquiryDataAccessor.updateStatus(enquiryId, newStatus);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = EnquiryService;