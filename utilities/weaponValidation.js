const { body, validationResult } = require('express-validator');

const weaponValidationRules = () => {
    return [
        body('name').isString().notEmpty().withMessage('Name is required'),
        body('type').isString().notEmpty().withMessage('Type is required'),
        body('slots').isString().notEmpty().withMessage('Number of slots is required'),
        body('rank').isString().notEmpty().withMessage('Rank is required'),
        body('attack').isString().notEmpty().withMessage('Attack power is required'),
        body('element').isString().notEmpty().withMessage('Element is required'),
        body('sharpness').isString().notEmpty().withMessage('Sharpness is required'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    weaponValidationRules,
    validate
};
