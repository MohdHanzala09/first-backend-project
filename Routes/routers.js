import express from 'express';
import { handleAbout, handleContact, handleHome } from '../Controllers/appLogics.js';

const appRoute = express();

appRoute.get('/' , handleHome);
appRoute.get('/about' , handleAbout);
appRoute.get('/contact' , handleContact);

export default appRoute;