import config from "../../config/config";
import AuthService from "../../services/AuthService";
import getTokenExpirationDate from "../../utils/getTokenExpirationDate";
import UserControllerInterface from "../../interfaces/controllers/UserControllerInterface";
import { UserRegisterInterface } from "../../interfaces/models/UserModelInterface";
import { encrypt } from "../../utils/Encryption";

class UserController implements UserControllerInterface {
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      AuthService.login(email, password)
        .then(({ user }) => {
          const rawCookie = JSON.stringify(user);
          const encryptedCookie = encrypt(rawCookie);

          // set cookie
          res.cookie('Authorization', encryptedCookie, {
            // httpOnly: true,
            expires: new Date(getTokenExpirationDate()),
            security: config.env === 'production',
          });

          res.status(200).json({ user });
        }).catch((error) => {
          res.status(401).json({ error: "Invalid credentials. Please try again." });
        });
    } catch (error) {
      res.status(500).send(error)
    }
  }

  logout(req: any, res: any) {
    try {
      return AuthService.logout(req, res);
    } catch (error) {
      res.status(400).json({ error: 'Error logging out' });
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
