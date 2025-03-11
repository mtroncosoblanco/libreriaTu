"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _authservice = require("../services/auth.service");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass';
let AuthController = class AuthController {
    static async register(req, res, next) {
        try {
            const userData = req.body;
            const newUser = await _authservice.AuthService.register(userData);
            res.status(201).json({
                message: 'User register successfully',
                newUser
            });
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const userData = req.body;
            console.log('looo', userData.email, userData.password);
            const { token, user } = await _authservice.AuthService.login(userData.email, userData.password);
            console.log(token, user);
            const validSameSiteValues = [
                "none",
                "lax",
                "strict"
            ];
            const sameSiteValue = validSameSiteValues.includes(process.env.COOKIE_SAME_SITE) ? process.env.COOKIE_SAME_SITE : "none";
            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 3,
                httpOnly: true,
                secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : true,
                sameSite: sameSiteValue
            });
            res.status(201).json({
                message: 'Login successfully:',
                user
            });
        } catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
            res.clearCookie('token');
            res.status(204).json({
                message: 'Logout successfully:'
            });
        } catch (error) {
            next(error);
        }
    }
    static async getAuthenticatedUser(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) res.status(401).json({
                message: "No autenticado"
            });
            const decoded = _jsonwebtoken.default.verify(token, TOKEN_PASSWORD);
            res.status(200).json(decoded);
        } catch (error) {
            next(error);
        }
    }
};

//# sourceMappingURL=auth.controller.js.map