import express from "express";
import { createResindency, getAllResidencies, getResidency } from "../controller/residencyController.js";
import jwtCheck from "../config/auth0Config.js";


const router = express.Router();

router.post("/create",jwtCheck,createResindency);
router.get("/allresd",getAllResidencies);
router.get('/:id', getResidency)

export { router as residencyRoute };