

import express from 'express'
import CurrentFile from '../../application/controller/FileController';
const router = express.Router();


router.get('/current-user',CurrentFile)


export default router
