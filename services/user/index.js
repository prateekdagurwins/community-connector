import { User } from '../../models/index.js';
export const addUser = async (payload = {}) => {
    let user = new User(payload);
    return user.save();
};

export const getUser = async (condition = {}) => {
    let user = await User.findOne(condition);
    return user
};

//Find all User
export const findAllUser = async (search, skip, limit) => {
   let user = await User.find(search).skip(skip).limit(limit)
        return user
};

export const getUserCount = async (search) => {
    let user = await User.countDocuments(search)
    return user
};

//Update User
export const findUserAndUpdate = async (condition, data)  => {
    let user = await User.findOneAndUpdate(condition, { $set: data }, { new: true })
    return user
};

//Delete User
export const findUserAndDelete = async (condition, data)  => {
    let user = await User.findOneAndDelete(condition, { $set: data }, { new: true })
    return user
};

findUserAndDelete