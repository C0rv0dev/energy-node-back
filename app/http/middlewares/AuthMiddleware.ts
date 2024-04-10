import jwt from 'jsonwebtoken';
import config from '../../config/config';
import User from '../../models/User';

async function AuthMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.cookies.Authorization;

    const decoded = jwt.verify(token, config.jwt_secret) as jwt.JwtPayload;

    if (Date.now() > (decoded.exp ?? 0)) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(decoded.sub);

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default AuthMiddleware;
