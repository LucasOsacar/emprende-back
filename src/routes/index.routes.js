import { Router } from 'express';
import { ping } from '../controllers/index.controller.js';
import * as fs from 'fs';

const router = Router();

router.get('/ping', ping);

// router.get('/styles.css', style);

// router.get('/img/fondo.jpg', fondo);

// router.get('/img/favicon.png', favicon);

export default router;