const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secretSigningKey = 'afc370ebc683d523988a9fff88c2ffea';
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, secretSigningKey);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
