"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserService", {
    enumerable: true,
    get: function() {
        return UserService;
    }
});
const _database = require("../database/database");
const _httpException = require("../exceptions/httpException");
let UserService = class UserService {
    static async getByEmail(email) {
        const findUser = await _database.prisma.user.findUnique({
            where: {
                email
            },
            omit: {
                password: true
            }
        });
        if (!findUser) throw new _httpException.HttpException(404, 'User not found');
        return findUser;
    }
    static async getById(id) {
        const findUser = await _database.prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!findUser) throw new _httpException.HttpException(404, 'User not found');
        return findUser;
    }
    static async getAll() {
        const users = await _database.prisma.user.findMany({
            omit: {
                password: true
            }
        });
        return users;
    }
};

//# sourceMappingURL=user.service.js.map