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
const _validatorsmiddleware = require("../middlewares/validators.middleware");
const _validationmiddleware = require("../middlewares/validation.middleware");
const _offercontroller = require("../controllers/offer.controller");
const _authmiddleware = require("../middlewares/auth.middleware");
const _isAdminmiddleware = require("../middlewares/isAdmin.middleware");
const router = (0, _express.Router)();
router.get('/', _authmiddleware.isAuthenticate, _offercontroller.OfferController.getAll);
router.get('/:id', _authmiddleware.isAuthenticate, _offercontroller.OfferController.getById);
router.post('/', _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _validatorsmiddleware.offerValidation, _validationmiddleware.ValidationMiddleware, _offercontroller.OfferController.create);
router.delete('/:id', _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _offercontroller.OfferController.delete);
router.put('/:id', _authmiddleware.isAuthenticate, _isAdminmiddleware.isAdmin, _validatorsmiddleware.offerValidation, _validationmiddleware.ValidationMiddleware, _offercontroller.OfferController.update);
router.post('/:id/rate/', _authmiddleware.isAuthenticate, _validatorsmiddleware.rateValidation, _offercontroller.OfferController.rate);
router.get('/:id/rate/', _authmiddleware.isAuthenticate, _offercontroller.OfferController.getRate);
router.get('/:id/myRate/', _authmiddleware.isAuthenticate, _offercontroller.OfferController.getMyPrice);
const _default = router;

//# sourceMappingURL=offer.routes.js.map