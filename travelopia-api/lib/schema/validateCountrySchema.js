const Joi = require('joi');

const countrySchema = Joi.object({
    country_name: Joi.string().required(),
    country_image_url: Joi.string(),
    description: Joi.string(),
    is_active: Joi.boolean()
});

const validateCountryRequest = (req, res, next) => {
    const { error } = countrySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {validateCountryRequest};
