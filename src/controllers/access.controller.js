import { CREATED, OK } from '../core/success.res.js';
import AccessService from '../services/access.service.js';

class AccessController {
  static signup = async (req, res) => {
    return new CREATED({
      message: 'E-Shop::: Sign-up successfully',
      metadata: await AccessService.signup(req.body),
    }).send(res);
  };

  static signin = async (req, res) => {
    return new OK({
      message: 'E-Shop::: Sign-in successfully',
      metadata: await AccessService.signin(req.body),
    }).send(res);
  };

  static signout = async (req, res) => {
    return new OK({
      message: 'Logout successfully',
      metadata: await AccessService.signout(req.keys),
    }).send(res);
  };
}

export default AccessController;
