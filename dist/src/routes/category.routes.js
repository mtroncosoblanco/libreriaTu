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
const _authmiddleware = require("../middlewares/auth.middleware");
const _categorycontroller = require("../controllers/category.controller");
const _express = require("express");
const _isAdminmiddleware = require("../middlewares/isAdmin.middleware");
const _validatorsmiddleware = require("../middlewares/validators.middleware");
const _validationmiddleware = require("../middlewares/validation.middleware");
const router = (0, _express.Router)();
router.get("/", _authmiddleware.isAuthenticate, _categorycontroller.CategoryController.getAll);
router.get("/:id", _authmiddleware.isAuthenticate, _categorycontroller.CategoryController.getById);
router.post("/", _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _validatorsmiddleware.categoryValidation, _validationmiddleware.ValidationMiddleware, _categorycontroller.CategoryController.create);
router.put("/:id", _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _validatorsmiddleware.categoryValidation, _validationmiddleware.ValidationMiddleware, _categorycontroller.CategoryController.update);
router.delete("/:id", _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _categorycontroller.CategoryController.delete);
const _default = router;

//# sourceMappingURL=category.routes.js.map