import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const checkToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acesso negado!' });
        return; 
    }

    try {
        const secret = process.env.USERTOKENSECRET;
        if (!secret) throw new Error('A variável de ambiente USERTOKENSECRET não está definida.');
        jwt.verify(token, secret);

        next(); 
    } catch (err) {
        res.status(401).json({ message: 'O Token é inválido!' });
    }
};
export default checkToken