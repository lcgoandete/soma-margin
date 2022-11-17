const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (user) => {
  await prisma.user.create({ data: user });
}

const getUserByEmail = async (email) => {
  const result = await prisma.user.findUnique({ where: { email }});
  return result;
}

const getUserByName = async (name) => {
  const result = await prisma.user.findUnique({ where: { name }});
  return result;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByName,
}
