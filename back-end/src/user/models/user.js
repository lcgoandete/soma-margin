const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (user) => {
  await prisma.user.create({ data: user });
};

const findAllUsers = async (take, skip) => {
  const result = await prisma.user.findMany({
    take,
    skip,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });
  return result;
};

const findUsersByName = async (name, take, skip) => {
  const result = await prisma.user.findMany({
    where: { name: { contains: name.toUpperCase() } },
    take,
    skip,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });
  return result;
};

const findUserByName = async (name) => {
  const result = await prisma.user.findMany({ where: { name } });
  return result[0];
};

const findUserById = async (id) => {
  const result = await prisma.user.findMany({ where: { id } });
  return result[0];
};

const findUserByEmail = async (email) => {
  const result = await prisma.user.findMany({ where: { email } });
  return result[0];
};

const deleteUser = async (id) => {
  await prisma.user.update({ where: { id }, data: { active: 0 } });
};

const updateUser = async (user) => {
  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      updated_at: new Date(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });
  return result;
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findAllUsers,
  findUserById,
  findUserByName,
  findUserByEmail,
  findUsersByName,
};
