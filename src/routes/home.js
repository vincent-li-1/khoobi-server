import express from 'express';
const router = express.Router();
import homeController from '../controllers/home.js';

router.get('/', homeController.getIndex);
router.put('/addService', homeController.addService);

export default router;