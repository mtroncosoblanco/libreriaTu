"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CategoryService", {
    enumerable: true,
    get: function() {
        return CategoryService;
    }
});
const _database = require("../database/database");
const _httpException = require("../exceptions/httpException");
let CategoryService = class CategoryService {
    static async getAll() {
        return _database.prisma.category.findMany();
    }
    static async getById(id) {
        const findOffert = await _database.prisma.category.findUnique({
            where: {
                id: id
            }
        });
        if (!findOffert) throw new _httpException.HttpException(404, "Category doesn't exist");
        return findOffert;
    }
    static async create(category) {
        try {
            return await _database.prisma.category.create({
                data: {
                    ...category
                }
            });
        } catch (error) {
            throw new _httpException.HttpException(401, "Error creating category");
        }
    }
    static async update(id, category) {
        try {
            return await _database.prisma.category.update({
                where: {
                    id
                },
                data: {
                    ...category
                }
            });
        } catch (error) {
            throw new _httpException.HttpException(404, "Category not found");
        }
    }
    static async delete(id) {
        try {
            return await _database.prisma.category.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new _httpException.HttpException(404, "Category not found");
        }
    }
};

//# sourceMappingURL=category.service.js.map