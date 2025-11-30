import asyncHandler from 'express-async-handler';
import validator from 'validator'
import AppError from '../utils/apperror.js';
import User from '../models/User.js';
import { successResponse } from '../utils/response.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';


/**
 * @route   POST /api/v1/auth/signIn
 * @desc    Sign in the user
 * @access  Public
 */
const signIn = asyncHandler(async(req,res)=>{
    res.send('SignIn endpoint')
});

/**
 * @route   POST /api/v1/auth/signUp
 * @desc    Register a new user
 * @access  Public
 */

const signUp = asyncHandler(async(req,res)=>{
    const {fullName,email,password,confirmPassword} = req.body;

    if(!fullName || !email || !password || !confirmPassword){
        throw new AppError("All fields are required", 400);
    };
    if(!validator.isEmail(email)){
        throw new AppError("Invalid Email", 400);
    };
    if(!validator.isStrongPassword(password)){
        throw new AppError("Password must include uppercase, lowercase, number, symbol and be 8+ chars", 400);
    };

    const userExists = await User.findOne({email});

    if(userExists)
        throw new AppError("Email already registered",400);

    const user = await User.create({fullName,email,password});

    generateAccessToken(res,user._id,user.tokenVersion);
    generateRefreshToken(res,user._id,user.tokenVersion);

    successResponse(res,201,"Registration successful",user);
});



export{signIn,signUp}
