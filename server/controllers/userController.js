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
      email: request.body.email,
      password: request.body.password,
    };

    models.User.findOne({
      where: {
        email: request.body.email,
      },
    }).then((user) => {
      jwt.sign({ user }, 'secretKey', (err, token) => {
        if (!user) {
          response.json({ message: 'Access Forbidden' });
        }
        response.send({
          token,
        });
      });
    });
  }
}

export default User;
