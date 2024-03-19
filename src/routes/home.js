import express from 'express';
const router = express.Router();
import homeController from '../controllers/home.js';

router.get('/getServices', homeController.getServices);
router.put('/addService', homeController.addService);


export default router;