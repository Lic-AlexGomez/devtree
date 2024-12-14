import User from "../models/User";
import { Request, Response } from 'express';
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
    
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({ email});
        if (userExists) {
             res.status(409).json({error: 'User already exists'});
             return;
        }
        const user = await User.create(req.body);
        user.password  =  await hashPassword(password);

        await user.save();
        res.status(201).json(user);
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 }