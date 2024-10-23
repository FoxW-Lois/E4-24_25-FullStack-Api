import { JwtPayload, sign, verify, } from 'jsonwebtoken';
import { DbUser } from './db/models';
import { TokenUser } from './models';
import { Request, Response } from 'express';
import { hash } from 'bcrypt';

export const cleanExpiredAccessTokensFromDB = async () => {
    const usersWithTokens = await DbUser.find({ expiredAccessTokens: { $exists: true, $not: { $size: 0 } } }).limit(100);
    for (const user of usersWithTokens) {
        for (const dbToken of user.expiredAccessTokens) {
            try {
                const token = verify(dbToken, process.env.JWT_ACCESS_TOKEN_SECRET!) as JwtPayload
            } catch (error) {
                await DbUser.updateOne({ email: user.email }, { $pull: { expiredAccessTokens: dbToken } }
                )
            }
        }
    }
}

export function createAccessToken(user: TokenUser) {
    return sign(user, process.env.JWT_ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME!
    });
}

export function createRefreshToken(user: TokenUser) {
    return sign(user, process.env.JWT_REFRESH_TOKEN_SECRET!, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME!
    });
}

export function addAccessToken(user: TokenUser, res: Response) {
    const token = createAccessToken(user);

    res.cookie(process.env.JWT_ACCESS_TOKEN_NAME!, token, {
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        httpOnly: true
    });
}

export function addRefreshToken(user: TokenUser, res: Response) {
    const token = createRefreshToken(user);
    res.cookie(process.env.JWT_REFRESH_TOKEN_NAME!, token, {
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        httpOnly: true
    });
}

export async function createTokenUser(user: TokenUser, req: Request) {
    return {
        email: user.email,
        fingerprint: await createUserFingerprint(req)
    };
}

export async function createUserFingerprint(req: Request) {
    const xForwardedFor = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "";
    const ip = xForwardedFor.split(",")[0];
    return await hash(ip, 12);
}