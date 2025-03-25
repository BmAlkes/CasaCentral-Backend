import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFav,
  toFav,
} from "../controller/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", jwtCheck, getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", jwtCheck, getAllFav);

export { router as userRouter };
