import express from 'express';
import { createQrCode, deleteQrCode, downloadAndDelet } from '../controllers/qrCode.controller.js';

const router = express.Router();


router.post("/code" , createQrCode);

router.post("/code/delete", deleteQrCode);

router.get("/code/download", downloadAndDelet);


export default router;