"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    categoryValidation: function() {
        return categoryValidation;
    },
    loginValidation: function() {
        return loginValidation;
    },
    offerValidation: function() {
        return offerValidation;
    },
    rateValidation: function() {
        return rateValidation;
    },
    registerValidation: function() {
        return registerValidation;
    }
});
const _expressvalidator = require("express-validator");
const registerValidation = [
    (0, _expressvalidator.body)('email').isEmail().withMessage('Invalid email'),
    (0, _expressvalidator.body)('password').isLength({
        min: 4
    }).withMessage('Password too short'),
    (0, _expressvalidator.body)('name').notEmpty().withMessage('Name required')
];
const loginValidation = [
    (0, _expressvalidator.body)('email').isEmail().withMessage('Invalid email'),
    (0, _expressvalidator.body)('password').notEmpty().withMessage('Password required')
];
const offerValidation = [
    (0, _expressvalidator.body)('title').isLength({
        min: 4,
        max: 40
    }).withMessage('Titulo mas de 4 caracteres'),
    (0, _expressvalidator.body)("description").optional().isLength({
        max: 2000
    }),
    (0, _expressvalidator.body)('contactEmail').optional().isEmail().withMessage('Invalid email'),
    (0, _expressvalidator.body)('published').optional().isISO8601().toDate().withMessage('Formato de fecha incorrecto'),
    (0, _expressvalidator.body)('expired').isISO8601().toDate().withMessage('Formato de fecha incorrecto')
];
const categoryValidation = [
    (0, _expressvalidator.body)('name').notEmpty().withMessage('Name required')
];
const rateValidation = [
    (0, _expressvalidator.body)('value').isInt({
        min: 0,
        max: 5
    }).toInt().withMessage('Value is required')
];

//# sourceMappingURL=validators.middleware.js.map