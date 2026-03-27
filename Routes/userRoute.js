import express from 'express'
import { handleCreate, handleLogin, handleCreatePost } from '../Controllers/userLogic.js';
import { isAuthenticated } from '../isAuthenticated.js';

const userRoute = express();

userRoute.post('/signup', handleCreate);
userRoute.post('/login', handleLogin);
userRoute.post('/post',isAuthenticated, handleCreatePost);

export default userRoute;
