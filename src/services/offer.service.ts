import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Book, PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient()

export class OfferService {
  static async getById(id: number) {
    const findOffer = await prisma.book.findUnique({ where: { id } });
    if (!findOffer) throw new HttpException(404, "Offer not found");
    return findOffer;
  }

  // localhost:3000/api/offer/?title=dam
  static async getAll(title: string = "") {
    /*  return await prisma.offer.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        }) */

    return await prisma.book.findMany({
      where: {
        ...(title && {
          title: {
            contains: title,
            //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  static async create(idUser: number, offer: Book) {
    console.log("creando", idUser);
    return await prisma.book.create({
      data: {
        ...offer,
        idUserCreator: idUser,
      },
    });
  }

  static async update(id: number, book: Book) {
    const findOffer = await prisma.book.findUnique({ where: { id } });
    if (!findOffer) throw new HttpException(404, "Offer doesnt exists");
    return await prisma.book.update({
      where: { id },
      data: {
        ...book,
      },
    });
  }

  static async delete(id: number) {
    try {
      return await prisma.book.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(404, "Offer not found");
    }
  }

  static async price(
    idUser: number,
    idBook: number,
    value: number
  ): Promise<void> {
    // Validar que el rating está dentro del rango permitido
    if (value < 0 || value > 5) {
      throw new Error("Rating must be between 0 and 5.");
    }

    // Verificar si la oferta existe
    const book = await prisma.book.findUnique({ where: { id: idBook } });
    if (!book) {
      throw new Error("Book not found.");
    }

    // Actualizar o crear la calificación

    /*
        SELECT  AVG(value) AS averageValue, COUNT(value) AS totalCount
    FROM Rating
    WHERE offerId = <offerId>;
        */
    await prisma.price.upsert({
      where: { idUser_idBook: { idUser, idBook } },
      update: { value },
      create: { idUser, idBook, value },
    });
  }

  static async getRate(idBook: number) {
    const ratingStats = await prisma.price.aggregate({
      where: { idBook },
      _avg: { value: true }, // Calcular el promedio
      _count: { value: true }, // Contar el total de calificaciones
    });
    return {
      totalRatings: ratingStats._count.value || 0,
      averageRating: ratingStats._avg.value?.toFixed(2) || 0,
    };
  }

  static async getMyRate(idUser: number, idBook: number) {
    return await prisma.price.findUnique({
      where: { idUser_idBook: { idUser, idBook } },
    });
  }
}
