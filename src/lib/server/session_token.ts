import { env } from '$env/dynamic/private';
import * as jose from 'jose';

export const getSecret = () => {
    return new TextEncoder().encode(env.JWT_SECRET!);
};

export const verifySessionToken = async (raw_token: string) => {
    return await jose.jwtVerify(raw_token!, getSecret(), {
        issuer: 'urn:study_buddy'
    });
};

export const createSessionToken = async (user_id: number) => {
    return await new jose.SignJWT()
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer('urn:study_buddy')
        .setSubject(user_id.toString())
        .setExpirationTime('1h')
        .sign(getSecret());
};
