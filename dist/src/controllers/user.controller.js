"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserController", {
    enumerable: true,
    get: function() {
        return UserController;
    }
});
const _httpException = require("../exceptions/httpException");
const _userservice = require("../services/user.service");
let UserController = class UserController {
    static async profile(req, res, next) {
        try {
            const email = req.user?.email;
            if (!email) throw new _httpException.HttpException(404, 'Email not found');
            const user = await _userservice.UserService.getByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const user = await _userservice.UserService.getAll();
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
};

//# sourceMappingURL=user.controller.js.map