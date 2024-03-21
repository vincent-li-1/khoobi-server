import express from 'express';
const router = express.Router();
import serviceController from '../controllers/services.js';

router.get('/getServices/:service/:location', serviceController.getServices);
router.put('/addService', serviceController.addService);
router.put('/editService/:id', serviceController.editService);
router.delete('/deleteService/:id', serviceController.deleteService);

export default router;