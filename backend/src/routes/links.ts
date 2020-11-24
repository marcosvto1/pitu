import { Router } from 'express';
import linksController from '../controllers/links';

const router = Router();

router.post('/links', linksController.postLinks);

router.get('/links/:code', linksController.hitLinks);

router.get('/links/:code/stats', linksController.getLinks);

export default router;