module.exports = (day, month) => {
  const birthDate = new Date(new Date().getFullYear(), month - 1, day);
  return birthDate.toLocaleDateString().substring(0, 5);
};
