const { PrismaClient } = require("@prisma/client");
const md5 = require("md5");

const prisma = new PrismaClient();

const createUser = async (user) => {
  await prisma.user.create({ data: user });
}

const getUserByEmail = async (email) => {
  const result = await prisma.user.findMany({ 
    where: { email, active: 1 },
  });
  return result;
}

const getUserByName = async (name) => {
  const result = await prisma.user.findUnique({ where: { name }});
  return result;
}

const createtUsers = async () => {
  const list = [
    {
      "name": "Rubens",
      "email": "rubens@rubens.com",
      "password": "W7tv3h2qm6",
      "role": "user"
    },
    {
      "name": "Rhaul",
      "email": "rhaul@rhaul.com",
      "password": "wwZsDTz6YU",
      "role": "user"
    },
    {
      "name": "Flavia",
      "email": "flavia@flavia.com",
      "password": "AAV6Y8NGyj",
      "role": "user"
    },
    {
      "name": "Ariana Urtado",
      "email": "arianaurtado@arianaurtado.com",
      "password": "fwxvj85AZ5",
      "role": "user"
    },
    {
      "name": "Ariana Marinho",
      "email": "arianamarinho@arianamarinho.com",
      "password": "x3nK7wVjht",
      "role": "user"
    },
    {
      "name": "Daiane",
      "email": "daiane@daiane.com",
      "password": "qrjHCp7tmB",
      "role": "user"
    },
    {
      "name": "Gerlan",
      "email": "gerlan@gerlan.com",
      "password": "J3nVW5SLVf",
      "role": "user"
    },
    {
      "name": "Natiely",
      "email": "natiely@natiely.com",
      "password": "PHcFm2a9aX",
      "role": "user"
    },
    {
      "name": "Ana Laura",
      "email": "analaura@analaura.com",
      "password": "5NcjZYoqeE",
      "role": "user"
    },
    {
      "name": "Barbara",
      "email": "barbara@barbara.com",
      "password": "5vf2ecMyr8",
      "role": "user"
    },
    {
      "name": "Susan",
      "email": "susan@susan.com",
      "password": "ZvaSLcu643",
      "role": "user"
    },
    {
      "name": "Aderlandia",
      "email": "aderlandia@aderlandia.com",
      "password": "qWMmx3twvp",
      "role": "user"
    },
    {
      "name": "Bruna",
      "email": "bruna@bruna.com",
      "password": "cDpuY3iELr",
      "role": "user"
    },
    {
      "name": "Laryssa",
      "email": "laryssa@laryssa.com",
      "password": "8mNVUnmXkE",
      "role": "user"
    },
    {
      "name": "Natalia",
      "email": "nathalia@natalia.com",
      "password": "yvSw7FZDhM",
      "role": "user"
    },
    {
      "name": "Rafaela Santiago",
      "email": "rafaelasantiago@rafaelasantiago.com",
      "password": "7ZVTfAEdK5",
      "role": "user"
    },
    {
      "name": "Marcos",
      "email": "marcos@marcos.com",
      "password": "HacE9jVBwJ",
      "role": "user"
    },
    {
      "name": "Isabela",
      "email": "isabela@isabela.com",
      "password": "MFyWa9gkwt",
      "role": "user"
    },
    {
      "name": "Karen",
      "email": "karen@karen.com",
      "password": "tdtSV3i5d6",
      "role": "user"
    },
    {
      "name": "Nathaly",
      "email": "nathaly@nathaly.com",
      "password": "y9oRwp9sB3",
      "role": "user"
    },
    {
      "name": "Pedro",
      "email": "pedro@pedro.com",
      "password": "eNdCV6FjAT",
      "role": "user"
    },
    {
      "name": "Wellington",
      "email": "wellington@wellington.com",
      "password": "Br36qFaSH4",
      "role": "user"
    },
    {
      "name": "Rafaela Serrano",
      "email": "rafaelaserrano@rafaelaserrano.com",
      "password": "CxfVHiQ2Gw",
      "role": "user"
    },
    {
      "name": "Isabel",
      "email": "isabel@isabel.com",
      "password": "CGnF6rfyyy",
      "role": "user",
      "active": 1
    },
    {
      "name": "Sandro",
      "email": "sandro@sandro.com",
      "password": "roHB2QKVJX",
      "role": "user",
      "active": 1
    },
    {
      "name": "Helio",
      "email": "helio@helio.com",
      "password": "pRKo5n2M4N",
      "role": "user",
      "active": 1
    },
  ]

  list.forEach(async user => {
    const result = await prisma.user.create({ 
      data: {...user, password: md5(user.password) }
    });
    console.log(result); 
  });
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByName,
}
