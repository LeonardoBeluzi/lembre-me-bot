module.exports = (userId) => {
  return userId === process.env.DISCORD_ADMIN_ID;
};
