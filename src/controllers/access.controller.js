import { CREATED } from '../core/success.res.js';
import AccessService from '../services/access.service.js';

class AccessController {
  static signup = async (req, res) => {
    return new CREATED({
      message: 'E-Shop::: Sign-up successfully ',
      metadata: await AccessService.signup(req.body),
    }).send(res);
  };

  static signin = async (req, res) => {
    await AccessService.signin();
  };
}

export default AccessController;
