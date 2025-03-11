"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CategoryController", {
    enumerable: true,
    get: function() {
        return CategoryController;
    }
});
const _categoryservice = require("../services/category.service");
const _httpException = require("../exceptions/httpException");
let CategoryController = class CategoryController {
    static async getAll(req, res, next) {
        try {
            const categories = await _categoryservice.CategoryService.getAll();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid category ID");
            const category = await _categoryservice.CategoryService.getById(id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const category = req.body;
            if (!category) throw new _httpException.HttpException(400, "Category is required");
            const newCategory = await _categoryservice.CategoryService.create(category);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid category ID");
            const category = req.body;
            if (!category) throw new _httpException.HttpException(400, "Category is required");
            const updatedCategory = await _categoryservice.CategoryService.update(id, category);
            res.status(200).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new _httpException.HttpException(400, "Invalid category ID");
            const deleted = await _categoryservice.CategoryService.delete(id);
            res.status(200).json(deleted);
        } catch (error) {
            next(error);
        }
    }
};

//# sourceMappingURL=category.controller.js.map