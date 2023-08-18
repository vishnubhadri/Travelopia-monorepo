const { EnquiryStatus } = require('../constants/constant');
const EnquiryDataAccessor = require('../data-accessor/EnquiryDataAccessor');
const enquiryCacheAccessor = require('../cache-accessor/EnquiryCacheAccessor');

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

  async getEnquiryStageFlow() {
    try {
      if(enquiryCacheAccessor.findCache('stage_flow_cache')){
        const flow=enquiryCacheAccessor.get('stage_flow_cache');
        return flow;
      }
      const flow={
        [EnquiryStatus.PENDING]:[EnquiryStatus.IN_PROGRESS,EnquiryStatus.COMPLETED],
        [EnquiryStatus.IN_PROGRESS]:[EnquiryStatus.PENDING,EnquiryStatus.COMPLETED],
        [EnquiryStatus.COMPLETED]:[EnquiryStatus.IN_PROGRESS],
        [EnquiryStatus.ARCHIVE]:[]
      }
      enquiryCacheAccessor.set('stage_flow_cache',flow)
      return flow;
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

  async updateEnquiryStatus(id, status) {
    try {
      const result = await this.EnquiryDataAccessor.updateStatus(id, status);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = EnquiryService;