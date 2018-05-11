import jwt from 'jsonwebtoken';
import models from '../models';

/**
 * Represents the User controller
 * @class
 */
class User {
  /**
   * Validate entries for user registrations
   * @method
   */
  static validateForm(request, response) {
    let isValid = true;
    const errors = {};

    if (!request.body.name) {
      errors.name = 'Please Enter your name';
      isValid = false;
    }

    if (!request.body.password) {
      errors.password = 'You must enter your password';
      isValid = false;
    }

    if (!request.body.email) {
      errors.email = 'Please enter your email address';
      isValid = false;
    }

    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (request.body.email && !filter.test(request.body.email)) {
      errors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!request.body.phone) {
      errors.phone = 'Please enter your phone number';
      isValid = false;
    }

    if (request.body.phone && Number.isNaN(request.body.phone)) {
      errors.phone = 'Enter a valid phone number';
      isValid = false;
    }

    if (!request.body.address) {
      errors.address = 'Please enter an address';
      isValid = false;
    }

    if (!request.body.isAdmin) {
      errors.isAdmin = 'Please enter your role';
      isValid = false;
    }

    if (isValid) {
      return isValid;
    }

    return response.status(500).json(errors);
  }

  /**
   * Register User
   * @method
   */
  static userSignUp(request, response) {
    const users = {
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
      phone: request.body.phone,
      address: request.body.address,
      isAdmin: request.body.isAdmin,
    };

    if (User.validateForm(request, response)) {
      models.User.findOne({ where: { email: request.body.email } }).then((foundMail) => {
        if (foundMail) {
          response.status(409).send({
            message: 'Someone already registered with this e-mail address',
          });
        } else {
          models.User.create(users).then(user => user)
            .then((user) => {
              jwt.sign({ user }, 'secretKey', (err, token) => {
                response.send({
                  token,
                });
              });
            });
        }
      });
    }
    return null;
  }

  /**
   * User login
   * @method
   */
  static userLogin(request, response) {
    const users = {
      email: request.body.email,
      password: request.body.password,
    };

    models.User.findOne({
      where: {
        email: request.body.email,
        password: request.body.password,
      },
    }).then((user) => {
      jwt.sign({ user }, 'secretKey', (err, token) => {
        if (!user) {
          response.status(401).json({ message: 'Please sign up or login to gain access' });
        }
        response.send({
          token,
        });
      });
    });
  }
}

export default User;
