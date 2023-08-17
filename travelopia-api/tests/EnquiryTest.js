const assert = require('chai').assert;
const sinon = require('sinon');
const EnquiryService = require('../lib/service/EnquiryService');

describe('EnquiryService', function () {
    let enquiryService;

    beforeEach(function () {
        this.sandbox = sinon.createSandbox();
        enquiryService = new EnquiryService();
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('should fetch enquiries', async function () {
        const fetchStub = this.sandbox.stub(enquiryService.EnquiryDataAccessor, 'fetch').resolves([{ id: 1, name: 'Enquiry 1' }]);
        
        const enquiries = await enquiryService.fetchEnquiries();

        assert.deepEqual(enquiries, [{ id: 1, name: 'Enquiry 1' }]);
        assert.isTrue(fetchStub.calledOnce);
    });

    it('should add an enquiry', async function () {
        const insertStub = this.sandbox.stub(enquiryService.EnquiryDataAccessor, 'insert').resolves({ insertId: 2 });
        
        const result = await enquiryService.addEnquiry({ name: 'New Enquiry' });

        assert.deepEqual(result, { insertId: 2 });
        assert.isTrue(insertStub.calledOnce);
    });

    it('should update an enquiry', async function () {
        const updateStub = this.sandbox.stub(enquiryService.EnquiryDataAccessor, 'update').resolves({ affectedRows: 1 });
        
        const result = await enquiryService.updateEnquiry({ enquiryId: 1, updateData: { name: 'Updated Enquiry' } });

        assert.deepEqual(result, { affectedRows: 1 });
        assert.isTrue(updateStub.calledOnce);
    });

    it('should update enquiry status', async function () {
        const updateStatusStub = this.sandbox.stub(enquiryService.EnquiryDataAccessor, 'updateStatus').resolves({ affectedRows: 1 });
        
        const result = await enquiryService.updateEnquiryStatus({ enquiryId: 1, newStatus: 'Archived' });

        assert.deepEqual(result, { affectedRows: 1 });
        assert.isTrue(updateStatusStub.calledOnce);
    });
});