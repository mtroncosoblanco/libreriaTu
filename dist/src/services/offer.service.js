"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OfferService", {
    enumerable: true,
    get: function() {
        return OfferService;
    }
});
const _database = require("../database/database");
const _httpException = require("../exceptions/httpException");
let OfferService = class OfferService {
    static async getById(id) {
        const findOffer = await _database.prisma.book.findUnique({
            where: {
                id
            }
        });
        if (!findOffer) throw new _httpException.HttpException(404, "Offer not found");
        return findOffer;
    }
    static async getAll(title = "") {
        return await _database.prisma.book.findMany({
            where: {
                ...title && {
                    title: {
                        contains: title
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 100,
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
    static async create(idUser, offer) {
        console.log("creando", idUser);
        return await _database.prisma.book.create({
            data: {
                ...offer,
                idUserCreator: idUser
            }
        });
    }
    static async update(id, book) {
        const findOffer = await _database.prisma.book.findUnique({
            where: {
                id
            }
        });
        if (!findOffer) throw new _httpException.HttpException(404, "Offer doesnt exists");
        return await _database.prisma.book.update({
            where: {
                id
            },
            data: {
                ...book
            }
        });
    }
    static async delete(id) {
        try {
            return await _database.prisma.book.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new _httpException.HttpException(404, "Offer not found");
        }
    }
    static async price(idUser, idBook, value) {
        if (value < 0 || value > 5) {
            throw new Error("Rating must be between 0 and 5.");
        }
        const book = await _database.prisma.book.findUnique({
            where: {
                id: idBook
            }
        });
        if (!book) {
            throw new Error("Book not found.");
        }
        await _database.prisma.price.upsert({
            where: {
                idUser_idBook: {
                    idUser,
                    idBook
                }
            },
            update: {
                value
            },
            create: {
                idUser,
                idBook,
                value
            }
        });
    }
    static async getRate(idBook) {
        const ratingStats = await _database.prisma.price.aggregate({
            where: {
                idBook
            },
            _avg: {
                value: true
            },
            _count: {
                value: true
            }
        });
        return {
            totalRatings: ratingStats._count.value || 0,
            averageRating: ratingStats._avg.value?.toFixed(2) || 0
        };
    }
    static async getMyRate(idUser, idBook) {
        return await _database.prisma.price.findUnique({
            where: {
                idUser_idBook: {
                    idUser,
                    idBook
                }
            }
        });
    }
};

//# sourceMappingURL=offer.service.js.map