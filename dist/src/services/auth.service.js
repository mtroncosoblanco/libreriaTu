"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _database = require("../database/database");
const _httpException = require("../exceptions/httpException");
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass';
let AuthService = class AuthService {
    static async register(user) {
        const findUser = await _database.prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (findUser) throw new _httpException.HttpException(409, `User ${user.email} already exists`);
        const passwordEncrypted = await _bcrypt.default.hash(user.password, 10);
        user.password = '';
        return await _database.prisma.user.create({
            data: {
                ...user,
                password: passwordEncrypted,
                role: null
            },
            omit: {
                password: true
            }
        });
    }
    static async login(email, password) {
        const findUser = await _database.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!findUser) throw new _httpException.HttpException(401, 'Invalid user or password');
        const isPasswordCorrect = await _bcrypt.default.compare(password, findUser.password);
        if (!isPasswordCorrect) throw new _httpException.HttpException(401, 'Invalid user or password');
        const token = _jsonwebtoken.default.sign({
            colorFavorito: 'azul',
            id: findUser.id,
            email: findUser.email,
            role: findUser.role
        }, TOKEN_PASSWORD, {
            expiresIn: "1h"
        });
        return {
            token,
            user: {
                id: findUser.id,
                email: findUser.email,
                role: findUser.role
            }
        };
    }
};

//# sourceMappingURL=auth.service.js.map