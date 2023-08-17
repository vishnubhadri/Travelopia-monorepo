const Joi = require('joi');
const {EnquiryStatus} = require('../constants/constant')
const enquiryRecordsSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    country_id: Joi.number().integer().positive(),
    message: Joi.string().allow(null),
    enquiry_date: Joi.date().timestamp(),
    duration_days: Joi.number().integer().positive(),
    duration_months: Joi.number().integer().positive(),
    stage_id: Joi.number().integer().positive(),
    phone_number: Joi.string().allow(null),
    number_of_travelers: Joi.number().integer().positive().default(1),
    status_of_enquiry: Joi.string().valid(EnquiryStatus).default('Pending')
});

const validateEnquiryRequest = (req, res, next) => {
    const { error } = enquiryRecordsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateEnquiryRequest };
