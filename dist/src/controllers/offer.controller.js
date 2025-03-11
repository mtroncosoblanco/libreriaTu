"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OfferController", {
    enumerable: true,
    get: function() {
        return OfferController;
    }
});
const _httpException = require("../exceptions/httpException");
const _offerservice = require("../services/offer.service");
let OfferController = class OfferController {
    static async getById(req, res, next) {
        try {
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid offer ID");
            const offer = await _offerservice.OfferService.getById(id);
            res.status(200).json(offer);
        } catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const { title } = req.query;
            const user = await _offerservice.OfferService.getAll(title);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const offerData = req.body;
            const userId = req.user?.id;
            if (!userId) throw new _httpException.HttpException(400, "User creator ID is required");
            const newOffer = await _offerservice.OfferService.create(userId, offerData);
            res.status(200).json(newOffer);
        } catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const offerData = req.body;
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid offer ID");
            const updatedOffer = await _offerservice.OfferService.update(id, offerData);
            res.status(200).json(updatedOffer);
        } catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid offer ID");
            const deletedOffer = await _offerservice.OfferService.delete(id);
            res.status(200).json(deletedOffer);
        } catch (error) {
            next(error);
        }
    }
    static async rate(req, res, next) {
        try {
            const id = Number.parseInt(req.params.id);
            console.log('id!!!', id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid offer ID");
            const { value } = req.body;
            const userId = req.user?.id;
            if (!userId) throw new _httpException.HttpException(400, "User creator ID is required");
            console.log('value!!!', value);
            console.log('userId!!!', userId);
            await _offerservice.OfferService.price(userId, id, value);
            res.status(200).json({
                message: 'Offer rate successfully'
            });
        } catch (error) {
            next(error);
        }
    }
    static async getRate(req, res, next) {
        try {
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid offer ID");
            const rate = await _offerservice.OfferService.getRate(id);
            console.log(rate);
            res.status(200).json(rate);
        } catch (error) {
            next(error);
        }
    }
    static async getMyPrice(req, res, next) {
        try {
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid offer ID");
            const userId = req.user?.id;
            if (!userId) throw new _httpException.HttpException(400, "User creator ID is required");
            const price = await _offerservice.OfferService.getMyRate(userId, id);
            res.status(200).json(price);
        } catch (error) {
            next(error);
        }
    }
};

//# sourceMappingURL=offer.controller.js.map