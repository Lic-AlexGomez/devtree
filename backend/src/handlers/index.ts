import type{ Request, Response } from 'express';
import { validationResult } from 'express-validator';

import User from "../models/User";
import { hashPassword,comparePassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
   
    const { default: slug } = await import("slug");
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({ email});
        if (userExists) {
             res.status(409).json({error: 'User email already exists'});
             return;
        }
        
        const handle = slug(req.body.handle, '');
        const handleExists = await User.findOne({ handle });

        if (handleExists) {
            res.status(409).json({ error: 'Handle already exists' });
            return;
        }
        const user = await User.create(req.body);
        user.password  =  await hashPassword(password);
        user.handle = handle;

        await user.save();
        res.status(201).json(user);
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 }
 export const login = async (req: Request, res: Response) => {  
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const validPassword = await comparePassword(password, user.password);
            if (!validPassword) {
                res.status(401).json({ error: 'Invalid password' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }