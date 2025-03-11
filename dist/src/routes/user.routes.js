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
const _authmiddleware = require("../middlewares/auth.middleware");
const _usercontroller = require("../controllers/user.controller");
const _isAdminmiddleware = require("../middlewares/isAdmin.middleware");
const router = (0, _express.Router)();
router.get('/profile', _authmiddleware.isAuthenticate, _usercontroller.UserController.profile);
router.get('/', _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _usercontroller.UserController.getAll);
const _default = router;

//# sourceMappingURL=user.routes.js.map