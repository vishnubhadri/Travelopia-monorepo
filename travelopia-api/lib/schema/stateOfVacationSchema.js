const Joi = require('joi');

const stateOfVacationSchema = Joi.object({
    stage_name: Joi.string().required(),
    is_active: Joi.boolean()
});

const validatestateOfVacationRequest = (req, res, next) => {
    const { error } = stateOfVacationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validatestateOfVacationRequest };
