import jwt from 'jsonwebtoken';

class UserMiddleware {
  static getUser(request, response, next) {
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
    return next('User token not found');
  }

  static checkAdmin(request, response, next) {
    if (request.user.isAdmin) {
      return next();
    }
    return next('User not an Admin');
  }

  static checkUser(request, response, next) {
    if (!request.user.isAdmin) {
      return next();
    }
    return next('Feature on available to user');
  }
}

export default UserMiddleware;
