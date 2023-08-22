import { Router } from 'express';
import { ping, index, guardar, tasks, actualizar, eliminar} from '../controllers/index.controller.js';


const router = Router();

router.get('/ping', ping);

router.get('/', index);

router.post('/task', guardar);

router.get('/task', tasks);

router.put('/task', actualizar);

router.delete('/task/:id', eliminar);

// router.get('/styles.css', style);

// router.get('/img/fondo.jpg', fondo);

// router.get('/img/favicon.png', favicon);

export default router;