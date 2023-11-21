import AccessService from '../services/access.service.js';

class AccessController {
  static signup = async (req, res, next) => {
    await AccessService.signup();
  };

  static signin = async (req, res, next) => {
    await AccessService.signin();
  };
}

export default AccessController;
