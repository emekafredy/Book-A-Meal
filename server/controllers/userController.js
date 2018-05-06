import jwt from 'jsonwebtoken';
import models from '../models';

class User {
  static userSignUp(request, response) {
    const users = {
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
      phone: request.body.phone,
      address: request.body.address,
      isAdmin: request.body.isAdmin,
    };

    models.User.create(users).then((user) => {
      response.send(user);
    });
  }

  static userLogin(request, response) {
    const users = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    jwt.sign({ users }, 'secretKey', (err, token) => {
      if (!users) {
        response.json({ message: 'Access Forbidden' });
      }
      response.json({
        token,
      });
    });

    // models.User.create(users).then((user) => {
    //   response.send(user);
    // });
  }

  // static verifyToken(request, response, next) {
  //   const bearerHeader = request['authorization'];

  //   if (typeof bearerHeader !== 'undefined') {
  //     return 'good';
  //   } else {

  //   }
  // }
}

export default User;
