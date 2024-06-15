const { Birthday } = require("../models/birthdayModel");

module.exports = {
  async execute(userId, day, month) {
    const userBirthday = await Birthday.findOne({
      where: {
        userId,
      },
    });

    if (userBirthday) {
      return await Birthday.update(
        {
          day,
          month,
        },
        {
          where: {
            userId,
          },
        }
      );
    }

    return await Birthday.create({
      day,
      month,
      userId,
    });
  },
};
