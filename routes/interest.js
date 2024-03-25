import express from 'express';
const router = express.Router();
import interestController from '../controllers/interest.js';

router.put('/submitInterest', interestController.submitInterest);

export default router;