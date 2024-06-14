const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute(userId, day, month) {
    const userBirthday = await prisma.birthday.findFirst({
      where: {
        userId,
      },
    });

    if (userBirthday) {
      return await prisma.birthday.update({
        where: {
          userId,
        },
        data: {
          day,
          month,
        },
      });
    }

    return await prisma.birthday.create({
      data: {
        day,
        month,
        userId,
      },
    });
  },
};
