const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not inclue HTML!',
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error('string.escapeHTML', { value });
                return clean;
            },
        },
    },
});

const Joi = BaseJoi.extend(extension);

module.exports.userSchema = Joi.object({
    username: Joi.string().required().escapeHTML().min(2).max(50),
    email: Joi.string().email().required().escapeHTML(),
    password: Joi.string().required().min(2).max(50),
});

module.exports.tourspotSchema = Joi.object({
    tourspot: Joi.object({
        title: Joi.string().required().escapeHTML().min(2).max(50),
        expected_budget: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        title: Joi.string().required().escapeHTML().min(2).max(50),
        body: Joi.string().required().escapeHTML(),
        rating: Joi.number().required().min(1).max(5),
    }).required(),
});
