"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authcontroller = require("../controllers/auth.controller");
const _validatorsmiddleware = require("../middlewares/validators.middleware");
const _validationmiddleware = require("../middlewares/validation.middleware");
const router = (0, _express.Router)();
router.post('/login', _validatorsmiddleware.loginValidation, _validationmiddleware.ValidationMiddleware, _authcontroller.AuthController.login);
router.post('/logout', _authcontroller.AuthController.logout);
router.post('/register', _validatorsmiddleware.registerValidation, _validationmiddleware.ValidationMiddleware, _authcontroller.AuthController.register);
router.get('/user', _authcontroller.AuthController.getAuthenticatedUser);
const _default = router;

//# sourceMappingURL=auth.routes.js.map