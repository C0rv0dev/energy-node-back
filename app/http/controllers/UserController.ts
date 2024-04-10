import config from "../../config/config";
import AuthService from "../../services/AuthService";
import getTokenExpirationDate from "../../utils/getTokenExpirationDate";
import UserControllerInterface from "../../interfaces/controllers/UserControllerInterface";

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
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send('Missing required fields');
      }

      await AuthService.register(name, email, password)
        .then(() => {
          return res.status(201).send('User created');
        })
        .catch((error) => {
          return res.status(400).send(error.message);
        });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new UserController();
