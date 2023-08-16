var express = require('express');
var router = express.Router();

const country=require('./CountryRouterHandler');
const enquiryRouterHandler=require('./EnquiryRouterHandler');


// Country Routers
router.get('/country', country.fetch);
//Private routes
router.post('/_country', country.insert);
router.put('/_country', country.update);


// enquiry Routers
router.post('/enquiry',  enquiryRouterHandler.insert);
//Private Routes
router.get('/_enquiry', enquiryRouterHandler.fetch);
router.put('/_enquiry',  enquiryRouterHandler.update);


module.exports = router;
