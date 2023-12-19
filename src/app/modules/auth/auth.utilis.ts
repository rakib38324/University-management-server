import jwt from 'jsonwebtoken';

type TjwtPayload = { userId: string; role: string };

export const createToken = (
  jwtPayload: TjwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
