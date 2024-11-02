const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Roie Raz',
        email: 'roieraz@gmail.com',
        password: '123456'
    }
]

async function getUsers(req,res,next){
    let users;
    try {
        users = await User.find({}, );
    } catch(err) {
        const error = new HttpError('Fetching users failed, please try again.',500);
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({getters: true}))})
     
}

async function signup(req,res,next){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new HttpError('Invalid input passed, please check your data.',422);
        return next(error);
    }
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    } catch(err){
            const error = new HttpError('Signing up failed, plese try again.', 500)
            return next(error);
    }
    
    if(existingUser){
        const error = new HttpError('User exist already, please log in instead.', 422);
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://static.wixstatic.com/media/c05dc9_e4b5b2d556c449a1918b627db525b279~mv2.jpg',
        password,
        places: []
    })

    try{
        await createdUser.save();
      } catch(err){
        const error = new HttpError('Signing up failed, please tty again', 500)
        return next(error);
      }

    res.status(201).json({user: createdUser.toObject({getters: true})});
}

async function login(req,res,next){

    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    } catch(err){
            const error = new HttpError('Logging in failed, plese try again.', 500)
            return next(error);
    }

    if(!existingUser || existingUser.password !== password)
    {
        const error = new HttpError('Invalid email or password, plese try again.',401);
        return next(error);
    }
    

    res.json({
        message: 'Logged in!',
        user: existingUser.toObject({getters: true})
    });

}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login