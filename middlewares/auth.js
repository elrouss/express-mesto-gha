const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  console.log(req)
  const { authorization } = req.headers;
  const secretSigningKey = 'U2FsdGVkX19nV2KreWqHk1BGD+ojOGgl39N93rtj1DVVSeYcdNPGnAQt4PtU2FvJrEiPtoQRACJ0B/yIORhjvQ==';
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) throw new UnauthorizedError('Неправильные почта или пароль');

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, secretSigningKey);
  } catch (err) {
    return res.status(401).send({ message: 'Неправильные почта или пароль' }); // TODO: пробросить в контроллер ошибок
  }

  req.user = payload;

  // TODO: почему-то не выводится в консоль. Из-за joi? Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  next();
};
