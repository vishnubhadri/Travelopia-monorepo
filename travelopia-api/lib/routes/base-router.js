var express = require('express');
var router = express.Router();

const countryRouterHandler=require('./CountryRouterHandler');
const enquiryRouterHandler=require('./EnquiryRouterHandler');
const stateOfVacationRouterHandler = require('./StateOfVacationRouterHandler');


// GET all countries
router.get('/countries', countryRouterHandler.fetch);
// POST a new country
router.post('/_countries', countryRouterHandler.insert);
// PUT update for a country
router.put('/_countries/:id', countryRouterHandler.update);

// Create enquiry
router.post('/enquiry',  enquiryRouterHandler.insert);
// GET all enquiries
router.get('/_enquiry', enquiryRouterHandler.fetch);
// PUT update for an enquiry
router.put('/_enquiry/:id',  enquiryRouterHandler.update);
// PUT update status for an enquiry
router.put('/_enquiry/:id/status',  enquiryRouterHandler.updateStatus);

router.get('/vacation-status', stateOfVacationRouterHandler.fetch.bind(stateOfVacationRouterHandler));
router.post('/_vacation-status', stateOfVacationRouterHandler.insert.bind(stateOfVacationRouterHandler));
router.put('/_vacation-status/:id', stateOfVacationRouterHandler.update.bind(stateOfVacationRouterHandler));
router.delete('/_vacation-status/:id', stateOfVacationRouterHandler.delete.bind(stateOfVacationRouterHandler));


module.exports = router;
