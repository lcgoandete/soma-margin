const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (user) => {
  await prisma.user.create({ data: user });
}

const findAllUsers = async (take, skip) => {
  const result = await prisma.user.findMany({
    take: take,
    skip: skip,
    where: { active: 1 },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });
  return result;
}

const findUserById = async (id) => {
  const result = await prisma.user.findMany({ where: { id, active: 1 }});
  return result[0];
}

const findUserByEmail = async (email) => {
  const result = await prisma.user.findMany({ where: { email: email, active: 1 }});
  return result[0];
}

const findUserByName = async (name) => {
  const result = await prisma.user.findMany({ where: { name: name, active: 1 }});
  return result[0];
}

const deleteUser = async (id) => {
  await prisma.user.update({ where: { id: id }, data: { active: 0 }});
}

const updateUser = async (user) => {
  const result = await prisma.user.update({
    where: { id: user.id },
    data: { 
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      active: user.active,
      updated_at: new Date,
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
}

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUserByName,
  deleteUser,
  updateUser,
}
