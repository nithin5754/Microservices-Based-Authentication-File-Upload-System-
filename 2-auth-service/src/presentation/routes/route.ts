import { getName } from "../../application/controller/UserController";


const express = require("express");
const router = express.Router();


router.get('/get-hello',getName)

export default router