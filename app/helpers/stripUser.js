module.exports = user => {
  const { email, name, registeredAt } = user;
  return { email, name, registeredAt };
};
