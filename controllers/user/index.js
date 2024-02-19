import Router from 'express';
import bcrypt from 'bcrypt'
import os from 'os';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../utilities/index.js';
import { addUser, findAllUser, findUserAndDelete, findUserAndUpdate, getUser, getUserCount } from '../../services/user/index.js';
import { createAccessToken } from '../../services/common/index.js';
import { filterFieldsInUsersResponse } from '../../utilities/userMapper/index.js';
import { redisClient } from '../../loader/index.js';
 const saltRounds = 10;

const userRouter = Router();

//Response Status code
const { SUCCESS, BAD_REQUEST, RECORD_ALREADY_EXISTS, SERVER_ERROR} = statusCodes;

//Response Messages
const {  USER_ADDED,
WRONG_CRED,
USER_LOGOUT,
USER_NOT_LOGIN,
USER_UPDATE,
USER_DELETED,
USER_FETCHED,
USER_LOGIN,
SOMETHING_WENT_WRONG,
CRED_REQUIRED,
NO_USER,
WRONG_PASS,
RECORD_ALREADY_EXIST} = responseMessages;

//add user
export const SignUp = catchAsyncAction(async (req, res) => {
    const emailToLower = req.body.email.toLowerCase()
    req.body.email = emailToLower
    const CheckUser =  await getUser({email: req.body.email})
    console.log(CheckUser, "checkuser>>>>>");
    if(CheckUser){
        return makeResponse(res, RECORD_ALREADY_EXISTS, true, RECORD_ALREADY_EXIST);
    }
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword
    const user = await addUser(req.body)
    if(user){
      const excludedFieldSingle = 'password'
      //This function can accept single value and array of values you can pass any of them if there are multiple fields to exclude pass the array.
      const filteredUserSingle = filterFieldsInUsersResponse(res, user, excludedFieldSingle);
        return makeResponse(res, SUCCESS, true, USER_ADDED, filteredUserSingle);
    }
    return makeResponse(res, SERVER_ERROR, false, SOMETHING_WENT_WRONG);
})

//login user
export const login = catchAsyncAction(async (req, res) => {
    let {email, password} = req.body
    if (!email || !password) {
        return makeResponse(res, BAD_REQUEST, false, CRED_REQUIRED);
      }
      const user = await getUser({email: email})
      if (!user) {
        return makeResponse(res, BAD_REQUEST, false, NO_USER);
      }
      const passwordMatch =  bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return makeResponse(res, BAD_REQUEST, false, WRONG_PASS);
      }
      if (user) {
       // Invalidate existing sessions for the user
        redisClient.del(`user:${user._id}`);
      //Creating access token.
      const accesstoken = createAccessToken({ id: user._id });
      const redisCon = await redisClient.set(`user:${user._id}`, accesstoken);
      if(redisCon === "OK"){
        return makeResponse(res, SUCCESS, true, USER_LOGIN, {accessToken: accesstoken});
      }
      return makeResponse(res, SERVER_ERROR, false, SOMETHING_WENT_WRONG); 
      } 
    return makeResponse(res, SERVER_ERROR, false, SOMETHING_WENT_WRONG); 
})


//logout user
export const logout = catchAsyncAction(async (req, res) => {
  if (req.user.id) {
    redisClient.del(`user:${req.user.id}`);
    req.session.destroy((err) => {
      if (err) {
        return makeResponse(res, SERVER_ERROR, false, SOMETHING_WENT_WRONG);
      } else {
        return makeResponse(res, SUCCESS, true, USER_LOGOUT);
      }
    });
  } else {
    return makeResponse(res, BAD_REQUEST, false, USER_NOT_LOGIN);
  }
})

//Get all user
export const allUser = catchAsyncAction(async (req, res) => {
    let page = 1,
        limit = 10,
        skip = 0
    if (req.query.page) page = req.query.page
    if (req.query.limit) limit = req.query.limit
    skip = (page - 1) * limit
    const users = await findAllUser({}, parseInt(skip), parseInt(limit));
    if (!users) {
        return makeResponse(res, BAD_REQUEST, false, NO_USER);
      }
      const excludedFieldSingle = ['password']
      //This function can accept single value and array of values you can pass any of them if there are multiple fields to exclude pass the array.
      const filteredUserSingle = filterFieldsInUsersResponse(res, users, excludedFieldSingle);
    const userCount = await getUserCount({ isDeleted: false});
    return makeResponse(res, SUCCESS, true, USER_FETCHED, filteredUserSingle, {
        current_page: page,
        total_records: userCount,
        total_pages: Math.ceil(userCount / limit),
    });
});

//Get single user
export const singleUser =  catchAsyncAction(async (req, res) => {
    const users = await getUser({_id: req.params?.userId});
    if (!users) {
        return makeResponse(res, BAD_REQUEST, false, NO_USER);
      }
      const excludedFieldSingle = 'password'
      //This function can accept single value and array of values you can pass any of them if there are multiple fields to exclude pass the array.
      const filteredUserSingle = filterFieldsInUsersResponse(res, users, excludedFieldSingle);
  return makeResponse(res, SUCCESS, true, USER_FETCHED, filteredUserSingle);
});

//Get all user
export const updateUser = catchAsyncAction( async (req, res) => {
    const users = await findUserAndUpdate({_id: req.params?.userId }, req.body);
    if (!users) {
        return makeResponse(res, BAD_REQUEST, false, NO_USER);
      }
    return makeResponse(res, SUCCESS, true, USER_UPDATE, users);
})

//Get all user
export const deletUser =  catchAsyncAction( async (req, res) => {
    const users = await findUserAndDelete({_id: req.params?.userId }, req.body);
    if (!users) {
        return makeResponse(res, BAD_REQUEST, false, NO_USER);
      }
    return makeResponse(res, SUCCESS, true, USER_DELETED, users);
})

export const userController = userRouter;


