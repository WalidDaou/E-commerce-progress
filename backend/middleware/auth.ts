import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Use a default value or throw an error if TOKEN_SECRET is not set
const TOKEN_SECRET: Secret = process.env.TOKEN_SECRET || 'default_secret';

export const auth = (req: Request, res: Response, next: any) => {
    try {
        console.log('TOKEN_SECRET:', TOKEN_SECRET);

        const token = req.get('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(403).send({ error: "Token missing!" });
        }
        console.log('Token:', token);

        try {
         
            const decoded = jwt.verify(token, TOKEN_SECRET);
            console.log('Decoded:', decoded);

            // Rest of your code...
            if (decoded) {
                //@ts-ignore
                req.decoded = decoded;
                next();
            }
        } catch (error: any) {
            console.error('Error verifying token:', error.message);
            return res.status(403).json({ error: 'Invalid Token' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Failed to verify JWT" });
    }
};
