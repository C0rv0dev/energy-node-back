import jwt from 'jsonwebtoken';
import config from '../../config/config';
import User from '../../models/User';
import { decrypt } from '../../utils/Encryption';

async function AuthMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.cookies.Authorization;
    const decryptToken = JSON.parse(decrypt(token));
    const decodedData = jwt.verify(decryptToken.token, config.jwt_secret) as jwt.JwtPayload;

    if (Date.now() > (decodedData.exp ?? 0)) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(decodedData.sub);

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default AuthMiddleware;
