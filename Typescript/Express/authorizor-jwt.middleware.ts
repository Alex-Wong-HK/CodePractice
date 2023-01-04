// @ts-nocheck
import { NextFunction, Request, Response } from 'express';
import jwt_decode, { JwtPayload } from 'jwt-decode';
export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        const request:JwtPayload = await jwt_decode<JwtPayload>(token);
        if (!request) return res.status(401).send();
        const userid = request.sub

        const userService = new UserService();
        const _user = await userService.get({ id: userid });
        if (!userid) {
            throw new Error('User Not Found.');
        }
        req.user = _user;
        next();
    } catch (e) {
        next(e);
    }
}
