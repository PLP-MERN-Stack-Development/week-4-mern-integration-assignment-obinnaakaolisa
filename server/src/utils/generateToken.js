import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
// This function generates a JWT token for a user based on their ID.
// The token is signed with a secret key and expires in 7 days.