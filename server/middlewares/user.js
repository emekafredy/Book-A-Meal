import jwt from 'jsonwebtoken';

/**
 * Represents the Middleware class
 * @class
 */
class UserMiddleware {
  static checkUser(request, response, next) {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = request.headers.authorization.split(' ')[1];
      return jwt.verify(token, 'secretKey', { expiresIn: 60 }, (err, decoded) => {
        if (err) {
          return next(err);
        }
        request.user = decoded.user;
        return next();
      });
    }
    return next('Register/Login to gain access');
  }


  static checkAdmin(request, response, next) {
    if (request.user.isAdmin) {
      return next();
    }
    return next('User not an Admin');
  }
}

export default UserMiddleware;
