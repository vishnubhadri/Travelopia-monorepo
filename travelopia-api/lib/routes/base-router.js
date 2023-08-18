var express = require("express");
var router = express.Router();

const countryRouterHandler = require("./CountryRouterHandler");
const enquiryRouterHandler = require("./EnquiryRouterHandler");
const stateOfVacationRouterHandler = require("./StateOfVacationRouterHandler");

const { validateCountryRequest } = require("../schema/validateCountrySchema");
const { validateEnquiryRequest } = require("../schema/enquiryRecordsSchema");
const { validatestateOfVacationRequest } = require("../schema/stateOfVacationSchema");

// GET all countries
router.get("/countries", countryRouterHandler.fetch);
router.get("/_countries", countryRouterHandler.fetchAll);
// POST a new country
router.post("/_countries", validateCountryRequest, countryRouterHandler.insert);
// PUT update for a country
router.put(
  "/_countries/:id",
  validateCountryRequest,
  countryRouterHandler.update
);
router.delete("/_countries/:id", countryRouterHandler.delete);

// Create enquiry
router.post("/enquiry", validateEnquiryRequest, enquiryRouterHandler.insert);
// GET all enquiries
router.get("/_enquiry", enquiryRouterHandler.fetch);
// PUT update for an enquiry
router.put("/_enquiry/:id", validateEnquiryRequest, enquiryRouterHandler.update);
// PUT update status for an enquiry
router.put("/_enquiry/:id/status", enquiryRouterHandler.updateStatus);

router.get(
  "/vacation-status",
  stateOfVacationRouterHandler.fetch.bind(stateOfVacationRouterHandler)
);
router.get(
  "/_vacation-status",
  stateOfVacationRouterHandler.fetchAll.bind(stateOfVacationRouterHandler)
);
router.post(
  "/_vacation-status",
  validatestateOfVacationRequest,
  stateOfVacationRouterHandler.insert.bind(stateOfVacationRouterHandler)
);
router.put(
  "/_vacation-status/:id",
  validatestateOfVacationRequest,
  stateOfVacationRouterHandler.update.bind(stateOfVacationRouterHandler)
);
router.delete(
  "/_vacation-status/:id",
  stateOfVacationRouterHandler.delete.bind(stateOfVacationRouterHandler)
);

module.exports = router;
