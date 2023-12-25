import AccessService from '../services/access.service.js';

class AccessController {
  static signup = async (req, res) => {
    await AccessService.signup(req.body);
  };

  static signin = async (req, res) => {
    await AccessService.signin();
  };
}

export default AccessController;
