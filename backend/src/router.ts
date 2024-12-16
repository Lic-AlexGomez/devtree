import { Router } from "express";
import {body} from 'express-validator';
import { createAccount, login } from "./handlers";
import { handleValidationErrors } from "./middleware/validation";

const router = Router();

router.post('/auth/register',
    body('handle').isLength({min: 3}).notEmpty().withMessage('Handle must be at least 3 characters and can not be empty'),
    body('name').isString().isLength({min: 5}).notEmpty().withMessage('Name must be at least 3 characters'),
    body('password').isString().isLength({min: 8}).notEmpty().withMessage('Password must be at least 8 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    handleValidationErrors,
    createAccount);
    router.post('/auth/login', 
        body('password').isString().isLength({min: 8}).notEmpty().withMessage('Password can not be empty'),
        body('email').isEmail().withMessage('Email must be valid'),
        handleValidationErrors,
        login);
export default router;