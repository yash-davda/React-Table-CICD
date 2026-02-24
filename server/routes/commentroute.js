import express from "express"
import { getComment } from "../controller/commentdata.js";
const router = express.Router();

router.get("/",getComment);

export default router;

