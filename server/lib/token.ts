import jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

export class Token {
    /**
     * Generate token
     * @param data 
     * @param secretKey 
     * @returns 
     */
    static generate(data: any, secretKey?: string) {
        const secret = secretKey ?? process.env.SECRET_KEY ?? '0';
        const options: SignOptions = {
            expiresIn: +(process.env.TOKEN_EXPIRY ?? 60),
        };
        const token = jwt.sign(
            {
                data,
            },
            secret,
            options,
        );
        return token;
    }

    /**
     * Set cookie session
     * @param event 
     * @param data 
     */
    static setSession(event: any, data: string) {
        setCookie(event, process.env?.TOKEN_NAME ?? 'token', data, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: +(process.env?.TOKEN_EXPIRY ?? 60) * 1000, // Convert to milliseconds
        })
    }
    
    /**
     * Verify and decode token
     * @param token 
     * @param secretKey 
     * @returns 
     */
    static verify(token: string, secretKey?: string): any {
        try {
            const secret = secretKey ?? process.env.SECRET_KEY ?? '0';
            const response = jwt.verify(token, secret, (err, decoded) => {
                if (typeof decoded === 'undefined' || err) return ResponseHandler.Unauthorized();
                return decoded;
            });
            return response;
        } catch (e: any) {
            return ResponseHandler.Unauthorized();
        }
    }

    /**
     * Get and set user context
     * @param event 
     * @returns 
     */
    static getUser(event: any) {
        return event.context?.user?.data ?? null;
    }
}