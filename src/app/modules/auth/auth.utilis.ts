import jwt, { JwtPayload } from 'jsonwebtoken';

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

export const VerifyToken = (token: string, secret: string) => {
  //====> varify token
  return jwt.verify(token, secret) as JwtPayload;
};
