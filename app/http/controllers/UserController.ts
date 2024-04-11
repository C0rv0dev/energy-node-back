import config from "../../config/config";
import AuthService from "../../services/AuthService";
import getTokenExpirationDate from "../../utils/getTokenExpirationDate";
import UserControllerInterface from "../../interfaces/controllers/UserControllerInterface";
import { UserRegisterInterface } from "../../interfaces/models/UserModelInterface";

class UserController implements UserControllerInterface {
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send('Missing required fields');
      }

      AuthService.login(email, password)
        .then((token) => {
          // set cookie
          res.cookie('Authorization', token, {
            httpOnly: true,
            expires: new Date(getTokenExpirationDate()),
            security: config.env === 'production',
            sameSite: 'lax',
          });

          res.sendStatus(200);
        }).catch((error) => {
          res.status(401).send(error.message);
        });
    } catch (error) {
      res.status(500).send(error)
    }
  }

  logout(req: any, res: any) {
    try {
      AuthService.logout(req, res);
    } catch (error) {
      res.status(400).send('Error logging out');
    }
  }

  async register(req: any, res: any) {
    try {
      const { firstName, lastName, email, password, passwordConfirm } = req.body;

      if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      const formData: UserRegisterInterface = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      };

      await AuthService.register(formData)
        .then(() => {
          return res.status(201).json({ message: 'User created' });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message });
        });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new UserController();
