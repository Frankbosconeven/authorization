const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // generate tokens
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    '25176c6d8567c07090a5692e566a931ef3d5e5655dc0fb09d82172a056887c0a',
    {
      expiresIn: '1h',
    }
  );

  return {
    token,
    user,
  };
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  //Checkig to see if email already exist
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: 'Email name already in used' });
  }

  ///Hash user password
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ ...req.body, password: hashedPassword });

  // generate tokens
  const token = generateToken(user);

  res.status(201).json({ user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ messages: 'Invalid username or password.' });
  }

  // check if password provided is the same as password in the db
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ messages: 'Password mismatch.' });
  }

  const token = generateToken(user);

  res.status(200).json({ token });
};
