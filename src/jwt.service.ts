import jwt, { type SignOptions } from 'jsonwebtoken';
import { UuidVO } from './auth/value-objects/uuid.vo';

type JwtPayload = {
    id: UuidVO | void;
};

const jwtSecret = process.env.JWT_PRIVATE_KEY || 'default_jwt_secret';

export const signAsync = (payload: JwtPayload, signOptions: SignOptions) =>
    new Promise<string>((resolve, reject) => {
        jwt.sign(payload, jwtSecret, signOptions, (err, token) => {
            if (err) reject(err);
            else resolve(token as string);
        });
    });

export const verifyAsync = (token: string) =>
    new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, payload) => {
            if (err) reject(err);
            else resolve(payload as JwtPayload);
        });
    });
