const yup = require('yup');

const schema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  role: yup.string().required().min(4),
});

const validateUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    await schema.validate({ name, email, password, role });
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  validateUser,
}
