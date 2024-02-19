
import express from 'express';
import { SignUp, allUser, deletUser, login, logout, singleUser, updateUser,  } from '../../controllers/index.js';
import { validators } from '../../middleware/index.js';
import auth from '../../middleware/auth/index.js';

const userRouter = express.Router();
//routers
 userRouter.post("/users/add", validators("addUser"), SignUp);
 userRouter.post('/users/login', validators("loginUser"), login);
 userRouter.post('/users/logout', auth, logout);
 userRouter.get('/users/allusers', allUser);
 userRouter.get('/users/profile/:userId', auth, singleUser);
 userRouter.patch('/users/update/:userId', auth, validators("updateUser"), updateUser);
 userRouter.delete('/users/delete/:userId', auth, deletUser);

 
 export {userRouter}

// export userRouter